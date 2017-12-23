/**
 * volcano
 * 
 * File...................address.js
 * Created on.............Thursday, 21st December 2017 1:14:20 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const config = require('../../config')
const blockexplorer = require('blockchain.info/blockexplorer')

module.exports = class AddressCommand extends Command {
  constructor() {
    super('address', {
      name: 'Address',
      description: 'Check the stats of a Bitcoin address',
      module: 'bitcoin',
      args: [{
        name: 'address',
        type: 'string',
        required: true
      }],
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    const _address = args.address.value
    const address = await blockexplorer.getAddress(_address, {
      apiCode: config.secrets.blockchain,
      limit: 5
    })
    const embed = api.embed(address.address, '', msg.author)
    embed.setURL(`https://blockchain.info/address/${address.address}`)
    embed.addField('Balance', `${address.final_balance / 100000000} BTC`, true)
    embed.addField('Total Sent', `${address.total_sent / 100000000} BTC`, true)
    embed.addField('Total Received', `${address.total_received / 100000000} BTC`, true)
    embed.addField('Transaction Amount', address.n_tx, true)
    return embed
  }
}