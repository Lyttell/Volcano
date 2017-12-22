/**
 * volcano
 * 
 * File...................transaction.js
 * Created on.............Thursday, 21st December 2017 1:37:05 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const config = require('../../config')
const blockexplorer = require('blockchain.info/blockexplorer')

module.exports = class TransactionCommand extends Command {
  constructor() {
    super('transaction', {
      name: 'Transaction',
      description: 'Check the stats of a Bitcoin transaction',
      module: 'bitcoin',
      args: [{
        name: 'transaction',
        type: 'string',
        required: true
      }],
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    const _transaction = args[0]
    const tx = await blockexplorer.getTx(_transaction, {
      apiCode: config.secrets.blockchain
    })
    let inputs = ''
    let outputs = ''
    tx.inputs.forEach((input) => {
      inputs += `${input.prev_out.addr} (${input.prev_out.value / 100000000} BTC)\n`
    })
    tx.out.forEach((output) => {
      outputs += `${output.addr} (${output.value / 100000000} BTC) (${output.spent ? '**Spent**' : 'Unspent'})\n`
    })
    inputs = inputs.substr(0, inputs.length - 1)
    outputs = outputs.substr(0, outputs.length - 1)

    const embed = api.embed(tx.hash, '', msg.author)
    embed.setURL(`https://blockchain.info/tx/${tx.hash}`)
    embed.addField('Block', tx.block_height, true)
    embed.addField('Size', tx.size, true)
    embed.addField('Double Spend', tx.double_spend ? 'Yes' : 'No', true)
    embed.addField('Hash', tx.hash, true)
    embed.addField('Inputs', inputs)
    embed.addField('Outputs', outputs)
    return embed
  }
}