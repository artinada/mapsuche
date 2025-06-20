import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { contactFunction } from './functions/contact/resource';

export const backend = defineBackend({
  data,
  contactFunction,
}); 