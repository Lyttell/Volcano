/**
 * volcano
 * 
 * File...................block.js
 * Created on.............Thursday, 21st December 2017 1:14:20 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const config = require('../../config')
const blockexplorer = require('blockchain.info/blockexplorer')
const moment = require('moment')

module.exports = class BlockCommand extends Command {
  constructor() {
    super('block', {
      name: 'Block',
      description: 'Get a block from the Bitcoin Blockchain',
      module: 'bitcoin',
      args: [{
        name: 'block',
        type: 'string',
        required: true
      }],
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    const _block = args[0] || 'latest'
    let block
    if(_block == 'latest') {
      block = await blockexplorer.getLatestBlock({
        apiCode: config.secrets.blockchain,
        limit: 5
      })
    } else {
      block = await blockexplorer.getBlock(_block, {
        apiCode: config.secrets.blockchain,
        limit: 5
      })
    }
    const embed = api.embed(`Block ${block.height}`, '', msg.author)
    embed.setURL(`https://blockchain.info/block/${block.hash}`)
    if(!block.previous_block) {
      embed.addField('Info', 'Block is latest block, no information', true)
    } else {
      embed.addField('Previous Block', block.previous_block, true)
      embed.addField('Size', block.size, true)
      embed.addField('Fee', block.fee, true)
      embed.addField('Transaction Amount', block.t_tx, true)
      embed.addField('Index', block.index, true)
      embed.addField('Nonce', block.nonce, true)
      embed.addField('Merkle Root', block.merkle_root, true)
    }
    
    return embed
  }
}