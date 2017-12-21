/**
 * volcano
 * 
 * File...................balance.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../handler')

module.exports = class BalanceCommand extends Command {
  constructor() {
    super('balance', {
      name: 'balance',
      description: 'balance command',
      module: 'test'
    })
  }
  async run(args, msg, api) {
    let embed = api.success('Test command succeeded!', msg.author)
    return {embed}
  }
}