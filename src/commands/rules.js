
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nomic',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {
  /*
  let RuleNumberArray = payload.shift() // Shift entfert erstes Element (immer "rules")
  let attachments = []

  RuleNumberArray.forEach((RuleNumber) => {
    attachments.push({
      title: 'Regel ' + RuleNumber,
      color: '#2FA44F',
      text: 'Regel Nummer ' + RuleNumber + ' ist unbekannt',
      mrkdwn_in: ['text']
    })
  })
  */

  let attachments = [
    {
      title: 'Regel',
      color: '#2FA44F',
      text: JSON.stringify(payload),
      mrkdwn_in: ['text']
    }
  ]

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
