/**
 * volcano
 * 
 * File...................db.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { User } = require('discord.js') // For JSDoc purposes

const config = require('./config.js')
const r = require('rethinkdbdash')({
  host: config.rethink.host,
  port: 28015,
  user: config.rethink.username,
  password: config.rethink.password,
  db: config.rethink.db,
  pool: true
})

/**
 * DUser class
 */
class DUser {
  /**
   * Create a User object
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
    this.lastDaily = new Date(info.lastDaily) || new Date(1) //TODO: use moment.js
  }

  /**
   * Update the DUser from the DB
   */
  async update() {
    let info = await this.r.table('users').get(this.id).run()
    init(info)
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
      flags: this.flags
    }
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
   */
  async getUser(user) {
    let id = user
    if(typeof user !== 'string') id = user.id
    let i = await this.r.table('users').get(id).run()
    if(typeof i == 'undefined' || !i) {
      await this.makeUser(id)
      return this.getUser(id)
    }
    return new DUser(i, (user instanceof User ? user : undefined))
  }
}
module.exports = new Database()