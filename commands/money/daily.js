/**
 * volcano
 * 
 * File...................daily.js
 * Created on.............Friday, 22nd December 2017 4:42:54 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')
const db = require('../../db')
const moment = require('moment')

module.exports = class DailyCommand extends Command {
  constructor() {
    super('daily', {
      name: 'Daily',
      description: 'Get your daily reward',
      module: 'money',
      ownerOnly: false
    })
  }
  async run(args, msg, api) {
    const user = await db.getUser(msg.author)
    const now = moment()
    const lastDaily = moment(user.lastDaily)
    const lastDailyD = lastDaily.add(1, 'day')
    const lastDailyFN = lastDailyD.fromNow()
    if(now.unix() > lastDailyD.unix()) {
      user.lastDaily = now
      let bal = await user.award(200)
      return api.success(`You have recevied $**200** for your daily bonus.\nYour new balance is $**${bal}**!`, msg.author)
    } else { 
      return api.error(`**${lastDailyFN.substr(0, 1).toUpperCase()}${lastDailyFN.substr(1)}** you can claim your daily reward.`, msg.author)
    }
  }
}