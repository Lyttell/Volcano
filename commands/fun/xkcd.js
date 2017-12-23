/**
 * volcano
 * 
 * File...................xkcd.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const axios = require('axios')
const { Colors } = require('../../constants')

module.exports = class XKCDCommand extends Command {
  constructor() {
    super('xkcd', {
      name: 'xkcd',
      description: 'Retrieve an XKCD',
      module: 'fun',
      args: [{
        name: 'comic',
        type: 'string',
        required: false,
        default: 'latest'
      }],
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    const comic = args.comic.value
    const url = comic === 'latest' ? 'https://xkcd.com/info.0.json' : `https://xkcd.com/${encodeURIComponent(comic)}/info.0.json`
    try {
      const res = await axios.get(url)
      const xkcd = res.data
      let embed = api.embed(xkcd.safe_title || xkcd.title, xkcd.alt || '*no alt text*', msg.author)
      embed.setURL(`https://xkcd.com/${xkcd.num}`)
      embed.setImage(xkcd.img)
      embed.setFooter(`${api.handler.name} ${build.version} | ${xkcd.year}-${xkcd.month}-${xkcd.day}`)
      embed.timestamp = undefined
      return embed
    } catch(err) {
      console.error(err)
      return api.error(`XKCD comic ${comic} doesn't exist.`, msg.author)
    }
  }
}