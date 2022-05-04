export const eventPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Event'],
    operationId: 'post',
    summary: 'API to register a new event',
    requestBody: {
      description: 'API to register a new event',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/eventParams'
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
              $ref: '#/schemas/event'
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
