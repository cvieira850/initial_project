export const signupPath = {
  post: {
    tags: ['Account'],
    operationId: 'post',
    summary: 'API to register a new user',
    requestBody: {
      description: 'Send email and role to register a new user',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParamsSchema'
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
              $ref: '#/schemas/login'
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
