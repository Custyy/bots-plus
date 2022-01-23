const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
if (db.fetch(`Dil_${message.author.id}`) == 'en') {
const English = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(client.user.username,client.user.avatarURL(),client.user.avatarURL({format: 'png', size: 128}))
.setTitle(`${client.user.username} Add Prices`)
.setDescription('Get the current costs of different quality addings.')
.addField('Quality Level Meaning','ALT 0 ==> 5 Real Person')
.addField('Quality Level 0','Price 1')
.addField('Quality Level 1','Price 1.5')
.addField('Quality Level 2','Price 2')
.addField('Quality Level 3','Price 2.5')
.addField('Quality Level 4','Price 3')
.addField('Quality Level 5','Price 3.5')
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
message.channel.send(English)
} else {
const Türkçe = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(client.user.username,client.user.avatarURL(),client.user.avatarURL({format: 'png', size: 128}))
.setTitle(`${client.user.username} Ekleme Fiyatları`)
.setDescription('Farklı kalitede ekleyerek mevcut maliyetleri alın.')
.addField('Kalite Level Anlamları','ALT 0 ==> 5 Gerçek İnsan')
.addField('Kalite Level 0','Fiyatı 1')
.addField('Kalite Level 1','Fiyatı 1.5')
.addField('Kalite Level 2','Fiyatı 2')
.addField('Kalite Level 3','Fiyatı 2.5')
.addField('Kalite Level 4','Fiyatı 3')
.addField('Kalite Level 5','Fiyatı 3.5')
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
message.channel.send(Türkçe)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['fiyatlar','prices'],
  permLevel: 0
}

exports.help = {
  name: 'Fiyatlar | Prices',
  description: 'Fiyat listesini atar.',
  usage: 'fiyatlar'
}