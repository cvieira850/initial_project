export const usersPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    operationId: 'get',
    summary: 'API to get user info',
    parameters:
    [
      {
        in: 'path',
        name: 'userId',
        description: 'user id to get data',
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
              $ref: '#/schemas/user'
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
