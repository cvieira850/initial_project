import pino from 'pino'
import pretty from 'pino-pretty'

const stream = pretty({
  colorize: true,
  levelFirst: true,
  translateTime: 'yyyy-dd-mm, h:MM:ss TT'
  // destination: './pino-logger.log'
})
const level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'
const logger = pino({ level }, stream)
export { logger }
