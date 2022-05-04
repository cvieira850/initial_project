export const mePath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    operationId: 'get',
    summary: 'API to get user info',
    requestBody: {
      description: 'API to get user info'
    },
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
