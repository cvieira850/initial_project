export const rolesSchema = {
  type: 'array',
  items: {
    schema: {
      $ref: '#/schemas/role'
    }
  }
}
