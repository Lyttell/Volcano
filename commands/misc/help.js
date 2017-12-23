/**
 * volcano
 * 
 * File...................help.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const RichEmbed = require('discord.js').RichEmbed
const { Colors } = require('../../constants')

module.exports = class HelpCommand extends Command {
  constructor() {
    super('help', {
      name: 'help',
      description: 'Help command',
      module: 'misc',
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    let cmds = this.handler.commands
    let modules = this.handler.modules
    let mods = {}
    let _cmds = {}
    let membed = new RichEmbed()    
    membed.setTitle(`ℹ \`Help\``).setColor('#55C1FF').setTimestamp().setFooter(`${api.handler.name} ${build.version} | Questions? https://discord.gg/Y6XJFpd`)
    
    for(let mod of modules) {
      let embed = new RichEmbed()
      membed.addField(mod.name, `${api.prefix}help **${mod.id}**`)
      embed.setTitle(`ℹ \`${mod.name}\``)
      embed.setColor(Colors.blue)
      embed.setTimestamp()
      embed.setFooter(`${api.handler.name} ${build.version} | Questions? https://discord.gg/Y6XJFpd`)
      for(let cmd of mod.commands) {
        if(!cmd) continue
        let prerun1 = await cmd._prerun(msg)
        if(!prerun1) continue
        let prerun2 = await cmd.preRun(msg)
        if(!prerun2) continue
        let cmde = new RichEmbed()
        cmde.setTitle(`ℹ \`${cmd.name}\``)
        cmde.setColor(Colors.blue)
        cmde.addField('Description', cmd.description)
        cmde.addField('Usage', typeof cmd.usage === 'string' ? cmd.usage.replace('^pfx^', api.prefix) : `${api.prefix}${cmd.id}`)
        let argz = ''
        if(cmd.args) {
          for(const arg of cmd.args) {
            argz += `${arg.required ? '<' : '['}${arg.name}${arg.required ? '>' : ']'} - ${arg.description || '*No argument description'}\n`
          }
          if(argz.length > 2) {
            argz = argz.substr(0, argz.length - 1)
            cmde.addField('Arguments', argz)
          }
        }
        cmde.setTimestamp().setFooter(`${api.handler.name} ${build.version} | Questions? https://discord.gg/Y6XJFpd`)
        _cmds[cmd.id] = cmde
        embed.addField(cmd.id, cmd.description)
      }
      mods[mod.id] = embed
    }
    if(!args || !args[0]) {
      return membed
    } else if(args[0] && mods[args[0]]) {
      return mods[args[0]]
    } else if(args[0] && _cmds[args[0]]) {
      return _cmds[args[0]]
    } else {
      return api.error(`The module \`${args[0]}\` doesn't exist.\nRun \`${api.prefix}help\` to view all modules.`)
        .setFooter(`${api.handler.name} ${build.version} | Questions? https://discord.gg/Y6XJFpd`)
    }
  }
}