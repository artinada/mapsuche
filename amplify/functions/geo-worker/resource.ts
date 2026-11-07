import { defineFunction, secret } from '@aws-amplify/backend';

export const geoWorkerFunction = defineFunction({ name: 'geo-worker', runtime: 22, timeoutSeconds: 300, memoryMB: 512, resourceGroupName: 'geo',
  environment: { OPENAI_API_KEY: secret('OPENAI_API_KEY') },
});
