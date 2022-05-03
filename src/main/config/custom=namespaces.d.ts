declare module Express {
  interface Request {
    accountId?: string
    locals?: any
  }
}
