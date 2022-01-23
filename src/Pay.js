const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
const User = message.mentions.users.first() || client.users.cache.get(args[0])
if (db.fetch(`Dil_${message.author.id}`) == 'en') {
const Amount = args[1]
if (!User) return message.channel.send(`Inproper Formatting, please have a valid username, id, mention and amount.
EX: **${client.prefix}pay <@${client.user.id}> 10**`)
if (isNaN(Amount)) return message.channel.send('\\❌ Please enter amount.')
if (db.fetch(`Coins_${message.author.id}`) < Amount) return message.channel.send(`<@${message.author.id}> You haven't **${Amount}** coins!`)
if (User.id === message.author.id) return message.channel.send(`<@${message.author.id}> You can't pay **yourself**!`)
if (User.bot) return message.channel.send(`<@${message.author.id}> You can't send bots!`)
if (Amount < 5) return message.channel.send(`<@${message.author.id}> You can send minimum **5** coins!`)
message.channel.send(`Paid <@${User.id}> ${Amount} coins. **Trading of any kind is not allowed.**`)
db.push(`Log_${User.id}`,`[+${Amount}] You recieved ${Amount} coins from ${message.author.username}`)
db.push(`Log_${message.author.id}`,`[-${Amount}] You gave ${Amount} coins to ${User.username}.`)
db.add(`Coins_${message.author.id}`,-Amount)
db.add(`Coins_${User.id}`,Amount)
} else {
const Amount = args[1]
if (!User) return message.channel.send(`Hatalı Biçimlendirme, lütfen geçerli bir kullanıcı adı, kimliği, sözü ve miktarı belirtin.
ÖR: **${client.prefix}pay <@${client.user.id}> 10**`)
if (isNaN(Amount)) return message.channel.send('\\❌ Lütfen miktar yazın')
if (db.fetch(`Coins_${message.author.id}`) < Amount) return message.channel.send(`<@${message.author.id}> Senin bakiyende **${Amount}** coins yok!`)
if (User.id === message.author.id) return message.channel.send(`<@${message.author.id}> **Kendine** Para Gönderemezsin!`)
if (User.bot) return message.channel.send(`<@${message.author.id}> **Bot**lara coin göndermezsin!`)
if (Amount < 5) return message.channel.send(`<@${message.author.id}> Minimum **5** coin yollayabilirsin!`)
message.channel.send(`**${Amount}** coin yollandı <@${User.id}>. **Herhangi bir tür ticarete izin verilmez.**`) 
db.push(`Log_${User.id}`,`[+${Amount}] ${Amount} coin alındı. Tarafından ${message.author.username}`)
db.push(`Log_${message.author.id}`,`[-${Amount}] ${Amount} coin verdin. ${User.username}.`)
db.add(`Coins_${message.author.id}`,-Amount)
db.add(`Coins_${User.id}`,Amount)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['pay','gönder'],
  permLevel: 0
}

exports.help = {
  name: 'Gönder | Pay',
  description: 'Para göndermeye yarar.',
  usage: 'gönder'
}