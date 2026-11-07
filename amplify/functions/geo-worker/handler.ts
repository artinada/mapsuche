import { openAIClient, runReport } from '../../../server/geo/core';
import { dynamoStore } from '../../../server/geo/dynamo-store';

export async function handler(event: { id: string }) {
  if (!/^[a-f0-9-]{36}$/.test(event.id)) throw new Error('Invalid report id');
  await runReport(event.id, dynamoStore(process.env.GEO_TABLE_NAME!), openAIClient(process.env.OPENAI_API_KEY));
}
