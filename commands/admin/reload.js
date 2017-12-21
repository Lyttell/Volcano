/**
 * volcano
 * 
 * File...................reload.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')

module.exports = class ReloadCommand extends Command {
  constructor() {
    super('reload', {
      name: 'reload',
      description: 'Reload commands',
      module: 'admin'
    })
  }
  async run(args, msg, api) {
    this.handler.reload(args[0])
    return {
      embed: api.success(`Command \`${args[0]}\` reloaded sucessfully!`, msg.author)
    }
  }
}