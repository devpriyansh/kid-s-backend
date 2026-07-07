import ajv from '../libs/ajv'

/** @type {import("ajv").Schema} */
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', minimum: 1 },
    userName: { type: 'string' },
    password: { type: 'string', description: 'Third party user identification code' },
    confirmPassword: { type: 'string', description: 'Third party user identification code' },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    email: { type: 'string', format: 'email', nullable: true },
    gender: { type: 'string', nullable: true },
    amount: { type: 'number', nullable: true },
    bonusAmount: { type: 'number', nullable: true },
    points: { type: 'number', nullable: true },
    redeemablePoints: { type: 'number', nullable: true },
    phone: { type: 'string', nullable: true },
    phoneCountryCode: { type: 'string', nullable: true },
    zohoLeadId: { type: 'integer', nullable: true },
    zohoContactId: { type: 'integer', nullable: true },
    dob: { type: 'string', format: 'date', nullable: true },
    street: { type: 'string', maxLength: 255, nullable: true, description: 'Street address of the user' },
    city: { type: 'string', maxLength: 100, nullable: true, description: 'City of the user' },
    state: { type: 'string', maxLength: 100, nullable: true, description: 'State of the user' },
    zipCode: { type: 'string', maxLength: 5, nullable: true, description: 'Zip code of the user' },
    country: { type: 'string', maxLength: 100, nullable: true, description: 'Country of the user' },
    resetToken: { type: 'string', nullable: true, description: 'Token for password resets' },
    promoCode: { type: 'string', nullable: true, description: 'Promo code associated with the user' },
    status: { type: 'integer', enum: [0, 1], default: 1, description: 'Status of the user (0 for inactive, 1 for active)' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    realMoneyAccess: { type: 'boolean' }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

ajv.addSchema(userSchema, '/user.json')
