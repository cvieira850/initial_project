export const userSchema = {
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
    },
    role: {
      type: 'string'
    },
    accessToken: {
      type: 'string'
    }
  }
}
