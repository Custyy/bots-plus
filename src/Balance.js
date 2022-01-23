const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
const Bakiye = db.fetch(`Coins_${message.author.id}`) || 0
const Log = db.fetch(`Log_${message.author.id}`)
const Multiple = 10
let Page;
let Length;
if (isNaN(args[0])) Page = 1
if (!Log) Length = 1
else Length = Log.length
if (args[0] > Math.floor(Length / 10)+1) Page = 1
else Page = args.length && Number(args[0]) ? Number(args[0]) : 1
const end = Page * Multiple
const start = end - Multiple
if (db.fetch(`Dil_${message.author.id}`) == 'en') {
const English = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(`${message.author.username}'s ${client.user.username} Coin Balance`, message.author.avatarURL({dynamic:true}))
.setTitle(`Balance: ${Bakiye} Coins!`)
.addField(`Don't Want To Add Bots For Coins?`,`Purchase more coins our support server (**${client.destek}**) to get up to 75000 coins a mont to grow your bot fast. Or use **${client.prefix}daily** to get 2 coins for free.`)
.addField('**Transactions**',Log ? Log.reverse().slice(start,end) : 'No have any transaction.')
.setFooter(`Page ${Page}/${Math.floor(Length / 10)+1} | ${client.prefix}bal page#`)
message.channel.send(English)
} else {
const Türkçe = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(`${message.author.username}'nin ${client.user.username} Coin Bakiyesi`, message.author.avatarURL({dynamic:true}))
.setTitle(`Bakiye: ${Bakiye} Coins!`)
.addField(`Coin İçin Bot Eklemek İstemiyor musunuz?`,`Sunucunuzu hızlı bir şekilde büyütmek için ayda 75000 jeton kazanmak için web mağazamızdan (**${client.destek}**) daha fazla jeton satın alın. Veya ücretsiz olarak 2 jeton kazanmak için **${client.prefix}günlük** kullanın.`)
.addField('**İşlemler**',Log ? Log.reverse().slice(start,end) : 'Herhangi bir işlem yok.')
.setFooter(`Sayfa ${Page}/${Math.floor(Length / 10)+1} | ${client.prefix}bakiye sayfa#`)
message.channel.send(Türkçe)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bal','bakiye','balance'],
  permLevel: 0
}

exports.help = {
  name: 'Bakiye | Balance',
  description: 'Kullanıcının Para Miktarını Gösterir',
  usage: 'bal'
}