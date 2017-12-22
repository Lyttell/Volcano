/**
 * volcano
 * 
 * File...................repl.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')

module.exports = class REPLCommand extends Command {
  constructor() {
    super('repl', {
      name: 'repl',
      description: 'REPL',
      module: 'admin',
      ownerOnly: true
    })
    global.user = global.user || []
  }
  async run(args, msg, api) {
    let code = args.join(' ')
    let embed = api.success('REPL', msg.author)
    return {embed}
  }
}