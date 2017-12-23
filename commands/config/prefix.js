/**
 * volcano
 * 
 * File...................prefix.js
 * Created on.............Friday, 22nd December 2017 5:17:08 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const db = require('../../db')
const { Colors } = require('../../constants')

module.exports = class PrefixCommand extends Command {
  constructor() {
    super('prefix', {
      name: 'prefix',
      description: 'Set the prefix of the server. Use `reset` as an argument to reset the prefix',
      module: 'config',
      guildOnly: true,
      args: [{
        name: 'prefix',
        type: 'string',
        required: false
      }],
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    const guild = await db.getGuild(msg.guild)
    if(typeof args.prefix.value === 'string') {
      const prefix = args.prefix.value
      if(!msg.member.hasPermission('MANAGE_GUILD')) return api.error('You require the \`Manage Server\` permission to run this command.')
      if(prefix === 'reset') {
        await guild.setPrefix('volcano.')
      } else {
        await guild.setPrefix(prefix)
      }
      return api.success(`Set prefix to \`${guild.prefix}\`!`, msg.author)
    } else {
      return api.embed(`🛠 \`Config\``, `The current prefix is \`${guild.prefix}\``, msg.author).setColor(Colors.blue)
    }
  }
}