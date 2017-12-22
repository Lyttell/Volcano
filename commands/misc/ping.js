/**
 * volcano
 * 
 * File...................ping.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')

module.exports = class PingCommand extends Command {
  constructor() {
    super('ping', {
      name: 'Ping',
      description: 'Ping command',
      module: 'test',
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    let embed = api.success(`🏓 Pong\nPing: ${api.handler.client.ping.toFixed(0)} ms`, msg.author)
    return {embed}
  }
}