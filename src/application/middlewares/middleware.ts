import { HttpResponse, HttpRequest } from '@/application/helpers'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
