export const resetPasswordPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    operationId: 'post',
    summary: 'API to reset user password',
    parameters:
    [
      {
        in: 'path',
        name: 'token',
        description: 'API to reset user password',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    requestBody: {
      description: 'API to reset user password',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/resetPasswordParams'
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
              $ref: '#/schemas/userStrict'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
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
