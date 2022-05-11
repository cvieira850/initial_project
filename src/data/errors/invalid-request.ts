export class InvalidRequestError extends Error {
  constructor (message: string) {
    super('Request failed')
    this.name = message
  }
}
