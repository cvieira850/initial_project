export const userStrictSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    name: {
      type: 'string'
    }
  }
}
