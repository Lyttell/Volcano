const Discord = require('discord.js')
const config = require('./config')
const path = require('path')
const fs = require('fs')

const bot = new Discord.Client()
const log = require('./log')

const { CommandHandler, Command, Module } = require('./handler')
const handler = new CommandHandler({
  client: bot,
  name: 'Volcano',
  owner: config.bot.owner,
  prefix: 'volcano.'
})

const package = require('./package.json')
global.build = {
  package: package,
  version: package.version
}

handler.registerModule(
  new Module('test', {
    name: 'Test Module'
  })
).registerModule(
  new Module('admin', {
    name: 'Administration'
  })
).registerModule(
  new Module('misc', {
    name: 'Miscellaneous'
  })
)

fs.readdir(path.join(__dirname, 'commands'), (err, files) => {
  if(err) return log.error('Command registerer error', err)
  files.forEach((file) => {
    let p = path.join(__dirname, 'commands', file)
    let cmd = new (require(p))()
    cmd.path = p
    handler.registerCommand(cmd)
  })
})

//handler.registerModule(new Module('test', {name: 'test module'})).registerCommand(new (require('./commands/test'))(), 'test')

fs.readdir(path.join(__dirname, 'events'), (err, files) => {
  if (err) return log.error('Event definer error', err)
  files.forEach((file) => {
    bot.on(file.split('.')[0], (...args) => {
      let module = require(path.join(__dirname, 'events', file))
      if(file == 'message.js') {
        module(bot, handler, ...args)
      } else {
        module(bot, ...args)        
      }
    })
  })
})

bot.login(config.token)