/**
 * volcano
 * 
 * File...................index.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const Discord = require('discord.js')
const config = require('./config')
const fs = require('fs-extra')
const klaw = require('klaw')
const path = require('path')

const bot = new Discord.Client({
  fetchAllMembers: true
})
const log = require('./log')

const { CommandHandler, Command, Module } = require('./handler')
const handler = new CommandHandler({
  client: bot,
  name: 'Volcano',
  owner: config.bot.owner,
  prefix: 'volcano.'
})

const package = require('./package.json')
global.config = config
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
).registerModule(
  new Module('fun', {
    name: 'Fun'
  })
).registerModule(
  new Module('config', {
    name: 'Configuration'
  })
).registerModule(
  new Module('money', {
    name: 'Money'
  })
).registerModule(
  new Module('bitcoin', {
    name: 'Bitcoin'
  })
)

const items = []
klaw(path.join(__dirname, 'commands'))
  .on('data', item => items.push(item.path))
  .on('error', (err, item) => log.error('Command registerer error', err, item.path))
  .on('end', () => {
    items.forEach((file) => {
      if(!file.endsWith('.js')) return
      let p = file
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