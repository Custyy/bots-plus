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
.setTitle('Invite The Bot')
.setDescription(`Invite me to your server with this invite link:
https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
.setImage('https://media.discordapp.net/attachments/829313002628579410/831862238330617936/x1.png')
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
message.channel.send(English)
} else {
const Türkçe = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(client.user.username,client.user.avatarURL(),client.user.avatarURL({format: 'png', size: 128}))
.setTitle('Botu Davet Et')
.setDescription(`Beni bu davet bağlantısıyla sunucunuza davet edin:
https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
.setImage('https://media.discordapp.net/attachments/829313002628579410/831862238330617936/x1.png')
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
message.channel.send(Türkçe)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['davet','invite'],
  permLevel: 0
}

exports.help = {
  name: 'Davet | Invite',
  description: 'Botu davet edersiniz',
  usage: 'davet'
}