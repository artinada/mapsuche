import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, TransactWriteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { GeoError } from './core.ts';
import type { GeoStore, StoredReport } from './core.ts';

export function dynamoStore(table: string): GeoStore {
  const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), { marshallOptions: { removeUndefinedValues: true } });
  const key = (id: string) => ({ pk: `REPORT#${id}` });
  return {
    async reserve(report, client) {
      const day = report.createdAt.slice(0, 10);
      try {
        await db.send(new TransactWriteCommand({ TransactItems: [
          ...[{ pk: `LIMIT#${day}#${client}`, max: 3 }, { pk: `LIMIT#${day}#GLOBAL`, max: 100 }].map(limit => ({ Update: {
            TableName: table, Key: { pk: limit.pk }, UpdateExpression: 'SET expiresAt = :ttl ADD used :one',
            ConditionExpression: 'attribute_not_exists(used) OR used < :max',
            ExpressionAttributeValues: { ':ttl': Math.floor(Date.now() / 1000) + 2 * 86400, ':one': 1, ':max': limit.max },
          } })),
          { Put: { TableName: table, Item: { ...key(report.id), ...report }, ConditionExpression: 'attribute_not_exists(pk)' } },
        ] }));
      } catch (error) {
        if ((error as { name?: string }).name === 'TransactionCanceledException' && (error as { CancellationReasons?: { Code?: string }[] }).CancellationReasons?.some(r => r.Code === 'ConditionalCheckFailed')) throw new GeoError(429, 'Das Tageslimit für kostenlose Checks ist erreicht. Bitte versuchen Sie es morgen erneut.');
        throw error;
      }
    },
    async get(id) { const result = await db.send(new GetCommand({ TableName: table, Key: key(id), ConsistentRead: true })); if (!result.Item) return undefined; const { pk: _pk, ...report } = result.Item; return report as StoredReport; },
    async save(report) { await db.send(new PutCommand({ TableName: table, Item: { ...key(report.id), ...report }, ConditionExpression: 'attribute_exists(pk)' })); },
    async claim(id) {
      try {
        const result = await db.send(new UpdateCommand({ TableName: table, Key: key(id), UpdateExpression: 'SET #status = :running, updatedAt = :now', ConditionExpression: '#status = :queued', ExpressionAttributeNames: { '#status': 'status' }, ExpressionAttributeValues: { ':running': 'running', ':queued': 'queued', ':now': new Date().toISOString() }, ReturnValues: 'ALL_NEW' }));
        const { pk: _pk, ...report } = result.Attributes!; return report as StoredReport;
      } catch (error) { if ((error as { name?: string }).name === 'ConditionalCheckFailedException') return undefined; throw error; }
    },
    async remove(id) { await db.send(new DeleteCommand({ TableName: table, Key: key(id) })); },
  };
}
