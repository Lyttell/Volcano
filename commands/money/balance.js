/**
 * volcano
 * 
 * File...................balance.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const db = require('../../db')
const { Colors } = require('../../constants')
module.exports = class BalanceCommand extends Command {
  constructor() {
    super('balance', {
      name: 'balance',
      description: 'balance command',
      module: 'money',
      aliases: ['bal', 'money', '$', '$$', '$$'],
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    const user = await db.getUser(msg.author)
    let embed = api.embed('💵 `Balance`', `You have $**${user.balance}**!`, msg.author).setColor(Colors.green)
    return embed
  }
}