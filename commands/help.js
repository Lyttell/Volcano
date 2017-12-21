/**
 * volcano
 * 
 * File...................help.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../handler')
const RichEmbed = require('discord.js').RichEmbed

module.exports = class HelpCommand extends Command {
  constructor() {
    super('help', {
      name: 'help',
      description: 'Help command',
      module: 'misc'
    })
  }
  async run(args, msg, api) {
    let cmds = this.handler.commands
    let modules = this.handler.modules
    let mods = {}
    let membed = new RichEmbed()    
    membed.setTitle(`ℹ \`Help\``).setColor('#55C1FF').setTimestamp().setFooter(`${api.handler.name} ${build.version}`)
    
    for(let mod of modules) {
      let embed = new RichEmbed()
      membed.addField(mod.name, `${api.prefix}help **${mod.id}**`)
      embed.setTitle(`ℹ \`${mod.name}\``)
      embed.setColor('#55C1FF')
      embed.setTimestamp()
      embed.setFooter(`${api.handler.name} ${build.version}`)
      for(let cmd of mod.commands) {
        if(!cmd) continue
        let prerun1 = await cmd._prerun(msg)
        if(!prerun1) continue
        let prerun2 = await cmd.preRun(msg)
        if(!prerun2) continue
        embed.addField(cmd.id, cmd.description)
      }
      mods[mod.id] = embed
    }
    if(!args || !args[0]) {
      msg.channel.send({embed: membed})
    } else if(args[0] && mods[args[0]]) {
      msg.channel.send({embed: mods[args[0]]})
    } else {
      msg.channel.send({embed: api.error(`The module \`${args[0]}\` doesn't exist.\nRun \`${api.prefix}help\` to view all modules.`)})
    }
  }
}