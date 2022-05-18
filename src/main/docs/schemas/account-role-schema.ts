export const accountRoleSchema = {
  type: 'object',
  properties: {
    roleId: {
      type: 'string',
      format: 'uuid'
    }
  }
}
