export const forgotParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    }
  },
  required: ['email']
}
