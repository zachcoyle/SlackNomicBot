
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nomic',
  icon_emoji: config('ICON_EMOJI')
}

let attachments = [
  {
    title: 'Nomic Bot liefert dir alle Regeln!',
    color: '#FFFF00',
    text: '`/nomic rules [number]` liefert die diese Regel',
    mrkdwn_in: ['text']
  },
  {
    title: 'Punktestände',
    color: '#E3E4E6',
    text: '`/nomic points {player}` liefert die die Punktestände',
    mrkdwn_in: ['text']
  }
]

const handler = (payload, res) => {
  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /help/ig, handler: handler }
