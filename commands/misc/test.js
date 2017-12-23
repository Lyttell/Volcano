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
      module: 'test',
      args: [{
        name: 'test',
        required: true,
        type: 'string'
      }, {
        name: 'fuck',
        required: true,
        type: 'user'
      }],
      ownerOnly: true
    })
  }
  async run(args, msg, api) {
    const response = `\`\`\`json
${JSON.stringify(args, null, 2)}
\`\`\``
    return response
  }
}