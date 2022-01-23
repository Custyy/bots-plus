const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
const ClientID = args[0]
const Balance = db.fetch(`Coins_${message.author.id}`)
let Pay;
const Cash = args[1]
if (!Cash) Pay = 15
if (isNaN(Cash)) Pay = 15
else Pay = Cash
if (db.fetch(`Dil_${message.author.id}`) == 'en') {
if (Balance < Pay) return message.channel.send('\\❌ You don\'t have '+ Pay +' coins.')
if (!ClientID) return message.channel.send('\\❌ Please enter a bot ID.')
if (isNaN(ClientID)) return message.channel.send('\\❌ Please enter numbers only.')
if (ClientID === client.user.id) return message.channel.send('\\❌ You can\'t add me.')
const Client = await client.users.fetch(ClientID)
if (!Client.bot) return message.channel.send('\\❌ The id entered does not match a bot')
if (Client.avatarURL() === undefined) return message.channel.send('\\❌ The bot whose id is entered does not have an avatar.')
if (moment.duration(new Date().getTime() - Client.createdAt.getTime()).format('DD') < 7) return message.channel.send('\\❌ 7 days have not passed since your bot was created')
if (db.fetch('Botlar').includes(`y${ClientID}`)) return message.channel.send('\\❌ The bot pool that entered the ID is already attached.')
message.channel.send(`\\✅ You have successfully added your bot!`)
db.push(`Log_${message.author.id}`,`[-${Pay}] Added bot to the bot pool.`)
db.push('Botlar',`y${ClientID}`)
db.add(`Coins_${message.author.id}`,-Pay)
db.add(`BOTBal_${ClientID}`,Pay)
} else {
if (Balance < Pay) return message.channel.send('\\❌ '+ Pay +' coine sahip değilsiniz.')
if (!ClientID) return message.channel.send('\\❌ Lütfen bir ID girin.')
if (isNaN(ClientID)) return message.channel.send('\\❌ Lütfen yalnızca sayı girin.')
if (ClientID === client.user.id) return message.channel.send('\\❌ Beni ekleyemezsin.')
const Client = await client.users.fetch(ClientID)
if (!Client.bot) return message.channel.send('\\❌ Girilen ID bir botla eşleşmiyor.')
if (Client.avatarURL() === undefined) return message.channel.send('\\❌ ID\'si girinen botun avatarı yok.')
if (moment.duration(new Date().getTime() - Client.createdAt.getTime()).format('DD') < 7) return message.channel.send('\\❌ Botunuzun oluşturulmasının üzerinden 7 gün geçmedi.')
if (db.fetch('Botlar').includes(`y${ClientID}`)) return message.channel.send('\\❌ ID\'si girinen bot zaten havuzda ekli.')
message.channel.send(`\\✅ Botunuzu başarıyla eklediniz!`)
db.push(`Log_${message.author.id}`,`[-${Pay}] Botunu bot havuzuna ekledi.`)
db.push('Botlar',`y${ClientID}`)
db.add(`Coins_${message.author.id}`,-Pay)
db.add(`BOTBal_${ClientID}`,Pay)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['satın','buy'],
  permLevel: 0
}

exports.help = {
  name: 'Satın Al | Buy',
  description: 'Satın alma menüsünü gösterir.',
  usage: 'satın'
}