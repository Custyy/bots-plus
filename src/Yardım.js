const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
const Choose = args[0]
if (db.fetch(`Dil_${message.author.id}`) == 'en') {

const English = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(client.user.username,client.user.avatarURL(),client.user.avatarURL({format: 'png', size: 128}))
.setTitle(`${client.user.username} Help:`)
.setDescription(`If you need more help please ask for it on our support server: ${client.destek} by making a ticket. **A video tutorial can be found here: ${client.video}**`)
.addField(`**\`${client.prefix}invite\`**`,'Invite the bot to your server.')
/*.addField(`**\`${client.prefix}help bots\`**`,'Commands to get bot on your server.')
.addField(`**\`${client.prefix}help levels\`**`,'Commands to earn more coins.')
.addField(`**\`${client.prefix}help activity\`**`,'Commands to increase activity on your server.')
.addField(`**\`${client.prefix}help economy\`**`,'Commands to manage your coins.')
.addField(`**\`${client.prefix}help extras\`**`,'Commands to make your server better.')
.addField(`**\`${client.prefix}help purchase\`**`,'Get coins without having to join servers.')*/
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
message.channel.send(English)
} else {
const Türkçe = new Discord.MessageEmbed()
.setColor('AQUA')
.setAuthor(client.user.username,client.user.avatarURL(),client.user.avatarURL({format: 'png', size: 128}))
.setTitle(`${client.user.username} Yardım:`)
.setDescription(`Daha fazla yardıma ihtiyacınız olursa lütfen destek sunucumuzdan isteyin: ${client.destek} bir bilet oluşturarak. **Bir eğitim videosu burada bulunabilir: ${client.video}**`)
.addField(`**\`${client.prefix}davet\`**`,'Botu sunucunuza davet edin.')
.addField(`**\`${client.prefix}buy\`**`,'Botunuzun reklamını verdirin.')
.addField(`**\`${client.prefix}bul\`**`,'Ekleyerek coin kazanabileceğiniz botları listeler.')
.addField(`**\`${client.prefix}gönder\`**`,'Kullanıcılar arası para transferi.')
.addField(`**\`${client.prefix}bakiye\`**`,'Bakiyenizi öğrenirisiniz.')
.addField(`**\`${client.prefix}fiyatlar\`**`,'Botu sunucunuza davet edin.')

/*.addField(`**\`${client.prefix}yardım botlar\`**`,'Sunucunuza bot almak için komutlar.')
.addField(`**\`${client.prefix}yardım leveller\`**`,'Daha fazla coin kazanmak için komutlar.')
.addField(`**\`${client.prefix}yardım aktivite\`**`,'Sunucunuzdaki etkinliği artırmaya yönelik komutlar.')
.addField(`**\`${client.prefix}yardım ekonomi\`**`,'Conileri yönetme komutları.')
.addField(`**\`${client.prefix}yardım ekstralar\`**`,'Sunucunuzu daha iyi hale getirecek komutlar.')
.addField(`**\`${client.prefix}yardım satınalma\`**`,'Sunuculara katılmak zorunda kalmadan coin kazanın.')*/
.setFooter(`(C) ${new Date().getFullYear()} ${client.user.username} | ${client.site} | ${client.version}`)
message.channel.send(Türkçe)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yardım','help'],
  permLevel: 0
}

exports.help = {
  name: 'Yardım | Help',
  description: 'Yardım Menüsünü Gösterir',
  usage: 'yardım'
}