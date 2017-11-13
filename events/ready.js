/**
 * Ready event for Tornado
 * @param {Discord.Client} bot 
 */
const log = require('../log')
module.exports = (bot) => {
  log.info('Bot is ready!')
}