/**
 * volcano
 * 
 * File...................message.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const log = require('../log')
const db = require('../db')

module.exports = async (bot, handler, msg) => {
  db.getUser(msg.author) // Create user if not found in DB on every message
  let res = await handler.onMessage(msg)
}