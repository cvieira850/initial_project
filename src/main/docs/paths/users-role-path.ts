export const usersRolePath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    operationId: 'put',
    summary: 'API to update user role info',
    parameters:
    [
      {
        in: 'path',
        name: 'userId',
        description: 'API to update user role info',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    requestBody: {
      description: 'API to register a new user',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/accountRole'
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
              $ref: '#/schemas/userRole'
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
