const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
if (db.fetch(`Dil_${message.author.id}`) == 'en') {
message.channel.send(`Get up to 4 daily coins by voting here twice each day: https://top.gg/bot/${client.user.id}/vote`)
} else {
message.channel.send(`Her gün burada iki kez oy vererek günlük 4 coine kadar kazanın: https://top.gg/bot/${client.user.id}/vote`)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oy','vote'],
  permLevel: 0
}

exports.help = {
  name: 'Oy | Vote',
  description: 'Oy verme sitesini gösterir.',
  usage: 'oy'
}