/**
 * volcano
 * 
 * File...................eval.js
 * Created on.............Wednesday, 20th December 2017 2:31:58 pm
 * Created by.............Relative
 * 
 */
const { Command } = require('../../handler')

module.exports = class EvalCommand extends Command {
  constructor() {
    super('eval', {
      name: 'Eval',
      description: 'Evaluate some scripts',
      module: 'admin'
    })
  }
  async run(args, msg, api) {
    let code = args.join(' ')
    let embed = api.embed('')
    try {
      let resp = eval(code)
      embed = api.success('Evaluation success', msg.author)
      embed.setTitle(`<:script:380455368758657035> \`Eval Succeeded\``)
      embed.setDescription(`\`\`\`${resp}\`\`\``)
      return {embed}
    } catch (err) {
      embed = api.error('Evaluation failed', msg.author)
      embed.setTitle(`<:script:380455368758657035> \`Eval Failed\``)
      embed.setDescription(`An error occurred while evaluating your script.\n\`\`\`${err.stack}\`\`\``)
      return {embed}
    }
  }
}