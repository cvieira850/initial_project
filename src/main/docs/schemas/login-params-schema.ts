export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      example: '12345'
    }
  },
  required: ['email', 'password']
}
