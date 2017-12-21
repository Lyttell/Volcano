/**
 * volcano
 * 
 * File...................log.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const winston = require('winston')
const path = require('path')
require('winston-daily-rotate-file')

const logger = new (winston.Logger)({
  level: process.env.ENV === 'development' ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join('logs', '.log'),
      datePattern: 'log.yyyy-MM-dd',
      prepend: true,
      localTime: true,  
      json: false,
      level: process.env.ENV === 'development' ? 'debug' : 'info'
    }),
    new winston.transports.DailyRotateFile({
      name: 'json_file',
      filename: path.join('logs', 'json', '.log'),
      datePattern: 'log.yyyy-MM-dd',
      prepend: true,
      localTime: true,
      level: process.env.ENV === 'development' ? 'debug' : 'info'
    }),
  ]
})

logger.debug('Logger has been created')

module.exports = logger