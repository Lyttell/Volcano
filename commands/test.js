const { Command } = require('../handler')


module.exports = class TestCommand extends Command {
  constructor() {
    super('test', {
      name: 'Test',
      description: 'test command',
      module: 'test'
    })
  }
  async run(args, msg, api) {
    let embed = api.success('Test command succeeded!', msg.author)
    return {embed}
  }
}