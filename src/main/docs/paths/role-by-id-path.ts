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
  },
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Role'],
    operationId: 'put',
    summary: 'API to change role info',
    parameters:
    [
      {
        in: 'path',
        name: 'roleId',
        description: 'role id to change data',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    requestBody: {
      description: 'API to register a new role',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/roleParams'
          }
        }
      }
    },
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
  },
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Role'],
    operationId: 'delete',
    summary: 'API to delete role info',
    parameters:
    [
      {
        in: 'path',
        name: 'roleId',
        description: 'role id to delete data',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    responses: {
      201: {
        description: 'Success'
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
