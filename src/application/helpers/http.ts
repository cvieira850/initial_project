import { UnauthorizedError, ServerError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
  query?: any
  locals?: any
  accountId?: any
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
