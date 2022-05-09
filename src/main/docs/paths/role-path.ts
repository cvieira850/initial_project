export const rolePath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Role'],
    operationId: 'post',
    summary: 'API to register a new role',
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
      403: {
        $ref: '#/components/forbidden'
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
