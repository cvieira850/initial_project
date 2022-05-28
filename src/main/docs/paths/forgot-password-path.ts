export const forgotPasswordPath = {
  post: {
    tags: ['Account'],
    operationId: 'post',
    summary: 'API to register reset token to user',
    requestBody: {
      description: 'API to register reset token to user',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/forgotParamsSchema'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Success'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
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
