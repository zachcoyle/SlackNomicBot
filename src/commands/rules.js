
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nomic',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {

  let RuleNumberArray = payload['text'].split(' ').shift() // Shift entfert erstes Element (immer "rules")
  let attachments = []

  let RuleNumberCount = RuleNumberArray.length

  for(let j = 0; j < RuleNumberCount; j++) {
    let RuleNumber = RuleNumberArray[j]
      attachments.push(
        {
            title: 'Regel ' + RuleNumber,
            color: '#2FA44F',
            text: 'Regel Nummer ' + RuleNumber + ' ist unbekannt',
            mrkdwn_in: ['text']
        })
  }

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

module.exports = { pattern: /rules/ig, handler: handler }
