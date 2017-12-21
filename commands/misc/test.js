/**
 * volcano
 * 
 * File...................test.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')

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