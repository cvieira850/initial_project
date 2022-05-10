export const roleByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Role'],
    operationId: 'get',
    summary: 'API to get role info',
    parameters:
    [
      {
        in: 'path',
        name: 'roleId',
        description: 'role id to get data',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/role'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
