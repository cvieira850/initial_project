export const roleParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    weight: {
      type: 'number'
    }
  },
  required: ['email', 'weight']
}
