/**
 * volcano
 * 
 * File...................ready.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const log = require('../log')
const {Client} = require('discord.js')

// TODO: Playing status rotator
const games = [
  `@Volcano help | ${build.version}`
]

 /**
 * Ready event for Volcano
 * @param {Client} bot 
 */
module.exports = (bot) => {
  log.info('Bot is ready!')
  bot.user.setStatus('dnd')
  bot.user.setGame(`@Volcano help | ${build.version}`)
}