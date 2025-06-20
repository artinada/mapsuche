import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { contactFunction } from '../functions/contact/resource';

const schema = a.schema({
  ContactSubmission: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email().required(),
      phone: a.string(),
      businessName: a.string().required(),
      service: a.string().required(),
      message: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  submitContact: a
    .mutation()
    .arguments({
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email().required(),
      phone: a.string(),
      businessName: a.string().required(),
      service: a.string().required(),
      message: a.string(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(contactFunction)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
}); 