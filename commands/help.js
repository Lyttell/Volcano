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
    membed.setTitle(`ℹ \`Help\``).setColor('#55C1FF').setTimestamp().setFooter(`Volcano ${build.version}`)
    
    for(let mod of modules) {
      let embed = new RichEmbed()
      membed.addField(mod.name, `»help **${mod.id}**`)
      embed.setTitle(`ℹ \`${mod.name}\``)
      embed.setColor('#55C1FF')
      embed.setTimestamp()
      embed.setFooter(`Volcano ${build.version}`)
      for(let cmd of mod.commands) {
        if(!cmd) continue
        embed.addField(cmd.id, cmd.description)
      }
      mods[mod.id] = embed
    }
    if(!args || !args[0]) {
      msg.channel.send({embed: membed})
    }
  }
}