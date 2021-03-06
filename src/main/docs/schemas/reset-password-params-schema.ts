export const resetPasswordParamsSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  required: ['password', 'passwordConfirmation']
}
