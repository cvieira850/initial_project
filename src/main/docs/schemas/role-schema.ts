export const roleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    name: {
      type: 'string'
    },
    weight: {
      type: 'number'
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    }
  }
}
