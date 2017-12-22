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
  const user = await db.getUser(msg.author)
  let guild
  if(msg.guild) guild = await db.getGuild(msg.guild)
  let res = await handler.onMessage(msg, user, guild)
}