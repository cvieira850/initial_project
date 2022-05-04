export const eventParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  },
  required: ['email', 'password']
}
