const { Command } = require('../handler')


module.exports = class REPLCommand extends Command {
  constructor() {
    super('repl', {
      name: 'repl',
      description: 'REPL',
      module: 'admin'
    })
    global.user = global.user || []
  }
  async run(args, msg, api) {
    let code = args.join(' ')
    let embed = api.success('REPL', msg.author)
    return {embed}
  }
}