import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { GeoError } from './core.ts';
import type { GeoStore, StoredReport } from './core.ts';

interface Database { reports: Record<string, StoredReport>; limits: Record<string, number> }
export function localStore(directory: string, clientLimit = 3, dailyLimit = 100): GeoStore {
  let queue: Promise<unknown> = Promise.resolve();
  const file = path.join(directory, 'reports.json');
  function transact<T>(change: (db: Database) => T): Promise<T> {
    const result = queue.then(async () => {
      await mkdir(directory, { recursive: true, mode: 0o700 });
      let db: Database;
      try { db = JSON.parse(await readFile(file, 'utf8')); }
      catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; db = { reports: {}, limits: {} }; }
      const day = new Date().toISOString().slice(0, 10);
      for (const [id, r] of Object.entries(db.reports)) if (r.expiresAt <= Date.now() / 1000) delete db.reports[id];
      for (const key of Object.keys(db.limits)) if (!key.startsWith(day)) delete db.limits[key];
      const value = change(db);
      await writeFile(`${file}.tmp`, JSON.stringify(db), { mode: 0o600 });
      await rename(`${file}.tmp`, file);
      return value;
    });
    queue = result.catch(() => {});
    return result;
  }
  return {
    reserve: (report, client) => transact(db => {
      const day = new Date().toISOString().slice(0, 10);
      const localKey = `${day}:${client}`;
      const globalKey = `${day}:global`;
      if ((db.limits[localKey] || 0) >= clientLimit || (db.limits[globalKey] || 0) >= dailyLimit) throw new GeoError(429, 'Das Tageslimit für kostenlose Checks ist erreicht. Bitte versuchen Sie es morgen erneut.');
      db.limits[localKey] = (db.limits[localKey] || 0) + 1;
      db.limits[globalKey] = (db.limits[globalKey] || 0) + 1;
      db.reports[report.id] = report;
    }),
    get: id => transact(db => db.reports[id]),
    save: report => transact(db => { if (db.reports[report.id]) db.reports[report.id] = report; }),
    claim: id => transact(db => {
      const report = db.reports[id];
      if (!report || report.status !== 'queued') return undefined;
      report.status = 'running'; report.updatedAt = new Date().toISOString();
      return report;
    }),
    remove: id => transact(db => { delete db.reports[id]; }),
  };
}
