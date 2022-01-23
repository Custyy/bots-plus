const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
const badges = require("discord-badges")
exports.run = async(client, message, args) => {
let Sayı;
let joinedAt;
//if (client.guilds.cache.get(message.guild.id).members.cache.get(db.fetch('Botlar').replace(/y/g,''))) joinedAt = client.guilds.cache.get(message.guild.id).members.cache.get(db.fetch('Botlar').replace(/y/g,'')).joinedAt
//else joinedAt = '2021-04-07T11:13:47.694Z'
//&& moment.duration(new Date().getTime() - joinedAt.getTime()).format('DD') < 30)// 
let Order = await db.fetch('Botlar').filter(x => x.length > 0 && client.guilds.cache.get(message.guild.id).members.cache.get(x.replace(/y/g,'')) === undefined && db.fetch(`BOTBal_${x.replace(/y/g,'')}`) > 1)
if (Order.length > 9) Sayı = 9
else Sayı = Order.length
if (db.fetch(`Dil_${message.author.id}`) == 'en') {
const English = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(client.user.username,client.user.avatarURL())
.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
.setTitle('Bot Finder')
.setDescription(`Hey ${message.author}, add these bots to get 1 coins each:`)
.addField('Want to get coins without having to join servers?',`Check out our coin packages with the ${client.prefix}purchase command.`)
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
for (var i = 0; i <= Sayı-1; i++) {
const user = await client.users.fetch(Order[i].replace(/y/g,''))
const Rozetler = await user.fetchFlags()
const BotunRozetleri = Rozetler.toArray()
const status = BotunRozetleri.includes('VERIFIED_BOT')
let Onay;
if (status == false) Onay = ''
else Onay = '\\✅'
English.addField(`${Onay} ${user.tag}`, `[Invite the bot!](https://discordapp.com/oauth2/authorize?client_id=${Order[i].replace(/y/g,'')}&scope=bot&permissions=0)`,true)
}
English.addField('Are you seeing bots you are already in?','This means you have been in those bots for a month and can kick without losing any coins.')
message.channel.send(English)
} else {
const Türkçe = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(client.user.username,client.user.avatarURL())
.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
.setTitle('Bot Bulucu')
.setDescription(`Hey ${message.author}, her birinden 1 jeton almak için bu botları ekleyin:`)
.addField('Sunuculara katılmak zorunda kalmadan coin kazanmak ister misiniz?',`Coin paketlerimizi ${client.prefix}satın komutu ile kontrol edin.`)
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
for (var i = 0; i <= Sayı-1; i++) {
const user = await client.users.fetch(Order[i].replace(/y/g,''))
const Rozetler = await user.fetchFlags()
const BotunRozetleri = Rozetler.toArray()
const status = BotunRozetleri.includes('VERIFIED_BOT')
let Onay;
if (status == false) Onay = ''
else Onay = '\\✅'
Türkçe.addField(`${Onay} ${user.tag}`, `[Botu davet et!](https://discordapp.com/oauth2/authorize?client_id=${Order[i].replace(/y/g,'')}&scope=bot&permissions=0)`,true)
}
Türkçe.addField('Zaten eklediğiniz botları görüyor musunuz?','Bunun anlamı botu eklemenizin üzerinden 1 ay geçmiş olması yani bu botları coin kaybetmeden kickleyebilirsiniz.')
message.channel.send(Türkçe)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['f','bul','b'],
  permLevel: 0
}

exports.help = {
  name: 'Bul | Find',
  description: 'Bot bulmaya yarar.',
  usage: 'bul'
}