import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { geoApi } from '../../../server/geo/api';
import { dynamoStore } from '../../../server/geo/dynamo-store';

const lambda = new LambdaClient({});
export async function handler(event: APIGatewayProxyEvent) {
  const origin = event.headers.origin || event.headers.Origin;
  const allowed = ['https://mapsuche.de', 'https://www.mapsuche.de', 'http://localhost:3000', 'http://127.0.0.1:3000'];
  const cors = origin && allowed.includes(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};
  if (origin && !allowed.includes(origin)) return { statusCode: 403, headers: { 'Cache-Control': 'no-store' }, body: JSON.stringify({ error: 'Diese Herkunft ist nicht erlaubt.' }) };
  if (event.httpMethod === 'POST' && !(event.headers['content-type'] || event.headers['Content-Type'] || '').startsWith('application/json')) return { statusCode: 415, headers: { ...cors, 'Cache-Control': 'no-store' }, body: JSON.stringify({ error: 'JSON erwartet.' }) };
  const result = await geoApi({ method: event.httpMethod, path: event.path.replace(/^\/geo/, ''), body: event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body || '',
    token: event.headers['x-geo-token'] || event.headers['X-Geo-Token'], client: event.requestContext.identity.sourceIp }, {
    store: dynamoStore(process.env.GEO_TABLE_NAME!), model: process.env.GEO_MODEL || 'gpt-5.6-terra', configured: process.env.GEO_ENABLED === 'true',
    enqueue: async id => { await lambda.send(new InvokeCommand({ FunctionName: process.env.GEO_WORKER_NAME!, InvocationType: 'Event', Payload: Buffer.from(JSON.stringify({ id })) })); },
  });
  return { statusCode: result.status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }, body: JSON.stringify(result.body) };
}
