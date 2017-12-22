/**
 * volcano
 * 
 * File...................db.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { User, Guild } = require('discord.js') // For JSDoc purposes

const config = require('./config.js')
const moment = require('moment')
const r = require('rethinkdbdash')({
  host: config.rethink.host,
  port: 28015,
  user: config.rethink.username,
  password: config.rethink.password,
  db: config.rethink.db,
  pool: true
})
const cache = {}
const guildCache = {}

/**
 * DUser class
 */
class DUser {
  /**
   * Create a DUser object
   * @param {object} info - Info object from the DB
   * @param {object} r - RethinkDB object
   * @param {User} [user] - Discord.JS user object
   */
  constructor(info, r, user) {
    /**
     * Original info from DB
     * @type {Object}
     */
    this.info = info

    /**
     * RethinkDB object
     * @type {Object}
     */
    this.r = r

    /**
     * Discord.JS user
     * @type {User|undefined}
     */
    this.user = user
    this.init(this.info)
  }
  /**
   * Initialize the DUser object with the data from the DB
   * @param {Object} info - DB info object
   */
  init(info) {
    this.info = info
    /**
     * User's ID
     * @type {string}
     */
    this.id = info.id
    
    /**
     * Balance
     * @type {number}
     */
    this.balance = info.balance || 0

    /**
     * Blacklisted
     * @type {boolean}
     */
    this.blacklisted = info.blacklisted || false

    /**
     * User Config
     * @type {Object}
     */
    this.config = info.config || {}

    /**
     * User flags
     * @type {Object}
     */
    this.flags = info.flags || {
      developer: false,
      admin: false,
      beta: false
    }

    /**
     * Last daily
     * @type {Date}
     */
    this.lastDaily = moment(info.lastDaily || '2001-01-01T00:00:00.000')
  }

  /**
   * Blacklist the user
   */
  async blacklist() {
    this.blacklisted = true
    await this.push()
  }

  /**
   * Unblacklist the user
   */
  async unblacklist() {
    this.blacklisted = false
    await this.push()
  }


  /**
   * Award the user with money
   * @param {number} amount - Amount to award the user with
   * @returns {number} - The new balance of the user
   */
  async award(amount) {
    this.balance = this.balance + amount
    await this.push()
    return this.balance
  }
  
  /**
   * Take away money from the user
   * @param {number} amount - Amount to take away from the user
   * @returns {number} - The new balance of the user
   */
  async take(amount) {
    this.balance = this.balance - amount
    await this.push()
    return this.balance
  }

  /**
   * Update the DUser from the DB
   */
  async update() {
    let info = await this.r.table('users').get(this.id).run()
    this.init(info)
  }

  /**
   * Pushes current data of the DUser object to the DB
   */
  async push() {
    let newUser = {
      id: this.id,
      balance: this.balance,
      blacklisted: this.blacklisted,
      config: this.config,
      flags: this.flags,
      lastDaily: this.lastDaily.toISOString()
    }
    await this.r.table('users').get(this.id).update(newUser).run()
    return true
  }
}

/** 
 * DGuild class
 */
class DGuild {
  /**
   * Create a DGuild object
   * @param {object} info - Info object from the DB
   * @param {object} r - RethinkDB object
   * @param {Guild} [guild] - Discord.JS guild object
   */
  constructor(info, r, guild) {
    /**
     * Original info from DB
     * @type {Object}
     */
    this.info = info

    /**
     * RethinkDB object
     * @type {Object}
     */
    this.r = r

    /**
     * Discord.JS guild
     * @type {Guild|undefined}
     */
    this.guild = guild
    this.init(this.info)
  }

  /**
   * Init the DGuild object
   * @param {object} info - info from DB
   */
  init(info) {
    this.info = info
    /**
     * Guild's ID
     * @type {string}
     */
    this.id = info.id

    /**
     * Guild's admins
     * @type {string[]}
     */
    this.admins = info.admins || []

    /**
     * Guild blacklist status
     * @type {boolean}
     */
    this.blacklisted = info.blacklisted || false

    /**
     * Guild config
     * @type {object}
     */
    this.config = info.config || {}

    /**
     * Guild flags
     * @type {object}
     */
    this.flags = info.flags || {}
    
    /**
     * Guild prefix
     * @type {string}
     */
    this.prefix = info.prefix || 'volcano.'

    /**
     * Guild premium status
     * @type {boolean}
     */
    this.premium = info.premium || false
  }
  
  /**
   * Blacklist the guild
   */
  async blacklist() {
    this.blacklisted = true
    await this.push()
  }

  /**
   * Unblacklist the guild
   */
  async unblacklist() {
    this.blacklisted = false
    await this.push()
  }

  /**
   * Set the prefix
   * @param {string} [prefix = 'volcano.'] - New prefix 
   */
  async setPrefix(prefix = 'volcano.') {
    this.prefix = prefix
    await this.push()
  }

  /**
   * Update the DGuild from the DB
   */
  async update() {
    let info = await this.r.table('servers').get(this.id).run()
    this.init(info)
  }

  /**
   * Pushes current data of the DGuild object to the DB
   */
  async push() {
    let newGuild = {
      id: this.id,
      admins: this.admins,
      config: this.config,
      flags: this.flags,
      prefix: this.prefix,
      premium: this.premium
    }
    await this.r.table('servers').get(this.id).update(newGuild).run()
    return true
  }
}

class Database {
  constructor() {
    this.r = r
  }
  async makeUser(id) {
    let newUser = {
      id: id,
      balance: 0,
      blacklisted: false,
      config: {},
      flags: {
        developer: false,
        admin: false,
        beta: false
      }
    }
    let res = await this.r.table('users').insert(newUser).run()
    return newUser
  }

  /**
   * Get database information of a user
   * @param {User|string} user - User to get database info from
   * @returns {DUser}
   */
  async getUser(user) {
    let id = user
    if(typeof user !== 'string') id = user.id
    if(cache[id]) return cache[id]
    let i = await this.r.table('users').get(id).run()
    if(typeof i == 'undefined' || !i) {
      await this.makeUser(id)
      return this.getUser(id)
    }
    let duser = new DUser(i, this.r, (user instanceof User ? user : undefined))
    cache[id] = duser
    return duser
  }
  
  async makeGuild(id) {
    let newGuild = {
      id: id,
      admins: [],
      blacklisted: false,
      config: {},
      flags: {},
      prefix: 'volcano.',
      premium: false
    }
    let res = await this.r.table('servers').insert(newGuild).run()
    return newGuild
  }

  /**
   * Get database information of a guild
   * @param {Guild|string} guild - Guild to get database info from
   * @returns {DGuild}
   */
  async getGuild(guild) {
    let id = guild
    if(typeof guild !== 'string') id = guild.id
    if(guildCache[id]) return guildCache[id]
    let i = await this.r.table('servers').get(id).run()
    if(typeof i == 'undefined' || !i) {
      await this.makeGuild(id)
      return this.getGuild(id)
    }
    let dguild = new DGuild(i, this.r, (guild instanceof Guild ? guild : undefined))
    guildCache[id] = dguild
    return dguild
  }
}
module.exports = new Database()