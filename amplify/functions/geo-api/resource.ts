import { defineFunction } from '@aws-amplify/backend';

export const geoApiFunction = defineFunction({ name: 'geo-api', runtime: 22, timeoutSeconds: 20, resourceGroupName: 'geo' });
