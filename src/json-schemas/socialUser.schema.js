import ajv from '../libs/ajv'

/** @type {import("ajv").Schema} */
const socialUserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string', nullable: true },
    emailVerified: { type: 'boolean', nullable: true },
    photoUrl: { type: 'string', nullable: true },
    providerId: { type: 'string' }, // e.g. "google", "apple"
    token: { type: 'string', nullable: true }
  },
  required: ['email', 'providerId'],
  additionalProperties: false
}

ajv.addSchema(socialUserSchema, '/socialUser.json')
