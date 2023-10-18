/* eslint-disable no-undef */
import moment from 'moment'
import path from 'path'
import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
const { combine, timestamp, label, prettyPrint } = format

export const infoLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'ums-auth-service' }),
    timestamp({
      format: () => moment().format('DD-MM-YYYY, h:mm:ssA'),
    }),

    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'ums-auth-success-%DATE%.log',
      ),
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'ums-auth-service' }),
    timestamp({
      format: () => moment().format('DD-MM-YYYY, h:mm:ssA'),
    }),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'ums-auth-error-%DATE%.log',
      ),
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
