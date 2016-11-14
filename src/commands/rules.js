
'use strict'

const _ = require('lodash')
const config = require('../config')
const pg = require('pg');

pg.defaults.ssl = true;

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nomic',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {
  let RuleNumberArray = payload['text'].split(' ')
  RuleNumberArray.shift()  // Shift entfert erstes Element (immer "rules")

  let attachments = []
  let RuleNumberCount = RuleNumberArray.length

  // verbinde DB für Regelabfrage
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    for (let j = 0; j < RuleNumberCount; j++) {
      let RuleNumber = RuleNumberArray[j]
      attachments.push(
        {
          title: 'Regel ' + RuleNumber,
          color: '#2FA44F',
          text: 'Regel Nummer ' + RuleNumber + ' ist unbekannt',
          mrkdwn_in: ['text']
        }
      )
    }

    let RowZeugs;
    client
      .query('SELECT table_schema,table_name FROM information_schema.tables;')
      .on('row', function(row) {
        RowZeugs = JSON.stringify(row);
      });

      attachments.push(
        {
          title: 'DB Test',
          color: '#FF0000',
          text: RowZeugs,
          mrkdwn_in: ['text']
        }
      )
  });

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /rules/ig, handler: handler }
