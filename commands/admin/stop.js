/**
 * volcano
 * 
 * File...................stop.js
 * Created on.............Friday, 22nd December 2017 6:12:21 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')

module.exports = class StopCommand extends Command {
  constructor() {
    super('stop', {
      name: 'Stop',
      description: 'Shutsdown the bot',
      module: 'admin',
      aliases: ['shutdown'],
      ownerOnly: true
    })
  }
  async run(args, msg, api) {
    let embed = api.success('Shutting down the bot', msg.author)
    await msg.channel.send({embed})
    api.handler.client.destroy().then(() => process.exit(0))
    return
  }
}