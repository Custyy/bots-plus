const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const PepeCode = new Set()
const db = require('quick.db')
const ms = require('parse-ms')
require('../ExtendedMessage.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
module.exports = async message => {
  let client = message.client
  if (message.author.bot) return
  if (!message.guild) return
  if (!message.content.startsWith(db.fetch(`Prefix_${message.guild.id}`) || ayarlar.prefix)) return
  let command = message.content.split(' ')[0].slice(db.fetch(`Prefix_${message.guild.id}`) || ayarlar.prefix.length)
  let params = message.content.split(' ').slice(1)
  let cmd;
  if (client.commands.has(command)) {
  cmd = client.commands.get(command)
  } else if (client.aliases.has(command)) {
  cmd = client.commands.get(client.aliases.get(command))
  }
  if (cmd) {
  const Bekle = ms(604800000 - (Date.now() - message.guild.createdAt))
  const SunucuTarihi = moment.duration(new Date().getTime() - message.guild.createdAt.getTime()).format('DD')
  const ErrorGün = new Discord.MessageEmbed()
  .setColor('RED')
  .setAuthor(client.user.username,client.user.avatarURL())
  .setTitle('You can now earn over 100 servers for your bot')
  .setDescription('We are sorry to say this but you cannot use commands on this server as this server was opened before 7 days!')
  .addField('You Can Use It After',`${Bekle.days} Days, ${Bekle.hours} Hours, ${Bekle.minutes} Minutes.`)
  .setImage('https://cdn.discordapp.com/attachments/829313002628579410/831862238330617936/x1.png')
  .setFooter(`(©) ${new Date().getFullYear()} ${client.user.username} | ${client.destek} | ${ayarlar.version}`)
  //if (SunucuTarihi < 7) return message.channel.send(ErrorGün).then(NotConfirmed => NotConfirmed.delete({timeout: 15000}))
  const Check = db.fetch(`Kurallar_${message.author.id}`)
  if (!Check) {
  const ManagerEmbed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setDescription(`
  🇹🇷 **|** Merhaba ${message.author},
  Eğer botu Türkçe dilinde kullanmak istiyorsanız "🇹🇷" emojisine tıklayın.

  🇺🇸 **|** Hello ${message.author},
  If you want use bot with English language react with "🇺🇸" emoji.`)
  .setThumbnail(client.user.avatarURL({size:2048}))
  .setTimestamp()
  .setFooter(message.author.tag,message.author.avatarURL())
  return message.channel.send(ManagerEmbed).then(async Embed => {
  Embed.react('🇹🇷').then(async () => {
  const TürkBayrağı = (reaction, user) => reaction.emoji.name == '🇹🇷' && user.id === message.author.id
  const Onay = Embed.createReactionCollector(TürkBayrağı)
  Onay.on('collect', async(reaction) => {
  Embed.delete()
  const Molarka = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setAuthor(`${client.user.username} Kurallar`,client.user.avatarURL())
  .setTitle('Bu kurallara uyulmaması, yasaklama ve / veya hesabın sıfırlanmasına neden olacaktır!')
  .setDescription(`
• Diğer kullanıcılara karşı haksız bir avantaj sağlamak için yapılan her türlü eylem açıkça kurallara aykırıdır. Bu, aşağıdakileri içerir ancak bunlarla sınırlı değildir:
├> Herhangi bir komut için makro / komut dosyalarını kullanma
└> Herhangi bir nedenle birden fazla hesap kullanmak

• Herhangi bir istismar **kullanmayın** ve botta bulunan hataları rapor edin  

• Botta bulunan hiçbir açıktan **faydalanmayın**

• Herhangi bir sorunuz varsa gelip [sunucumuzdan](${client.destek}) bize sorun! 

*Emoji ile tepki vermek, kuralları takip edeceğiniz ve sonuçlarını kabul edeceğiniz anlamına gelir.*`)
  .setFooter(`${db.fetch('Kabul').toLocaleString()} Kullanıcı kabul etti`)
  if (!Check) return message.channel.send('⚠ **Botu kullanmak için bu kuralları kabul etmelisiniz!**',Molarka).then(async(Embed) => {
  const Filtre = (reaction, user) => {return reaction.emoji.name === '👍' && user.id === message.author.id}
  Embed.react('👍')
  const Tepkiler = Embed.createReactionCollector(Filtre)
  Tepkiler.on('collect', async (Tepki) => {
  if (Tepki.emoji.name === '👍') {
  Embed.edit(Molarka.setDescription(`
• Diğer kullanıcılara karşı haksız bir avantaj sağlamak için yapılan her türlü eylem açıkça kurallara aykırıdır. Bu, aşağıdakileri içerir ancak bunlarla sınırlı değildir:
├> Herhangi bir komut için makro / komut dosyalarını kullanma
└> Herhangi bir nedenle birden fazla hesap kullanmak

• Herhangi bir istismar **kullanmayın** ve botta bulunan hataları rapor edin  

• Botta bulunan hiçbir açıktan **faydalanmayın**

• Herhangi bir sorunuz varsa gelip [sunucumuzdan](${client.destek}) bize sorun! 

Bu da ne? Bu kuralları kabul ettiniz! <3`).setColor('GREEN')
)
  db.set(`Kurallar_${message.author.id}`,true)
  db.add(`Kabul`,1)
  db.set(`Dil_${message.author.id}`,'tr')
  }
  })
  })
  })
  })

 Embed.react('🇺🇸').then(async () => {
 const TürkBayrağı = (reaction, user) => reaction.emoji.name == '🇺🇸' && user.id === message.author.id
 const Onay = Embed.createReactionCollector(TürkBayrağı)
 Onay.on('collect', async(reaction) => {
  Embed.delete()
  const Molarka = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setAuthor(`${client.user.username} Kurallar`,client.user.avatarURL())
  .setTitle('Failure to follow these rules will result in a ban and/or account reset!')
  .setDescription(`
• Any actions performed to gain an unfair advantage over other users are explicitly against the rules. This includes but not limited to:
├> Using macros/scripts for any commands
└> Using multiple accounts for any reason

• Do **not** use any exploits and report any found in the bot

• You can **not** sell/trade cowoncy or any bot goods for anything outside of the bot

• If you have any questions come ask us in our [server](${client.destek})!

*Reacting with the emoji means you will follow the rules and acknowlege the consequences.*`)
  .setFooter(`${db.fetch('Kabul').toLocaleString()} Kullanıcı kabul etti`)
  if (!Check) return message.channel.send('⚠ **You must accept these rules to use the bot!**',Molarka).then(async(Embed) => {
  const Filtre = (reaction, user) => {return reaction.emoji.name === '👍' && user.id === message.author.id}
  Embed.react('👍')
  const Tepkiler = Embed.createReactionCollector(Filtre)
  Tepkiler.on('collect', async (Tepki) => {
  if (Tepki.emoji.name === '👍') {
  Embed.edit(Molarka.setDescription(`
• Any actions performed to gain an unfair advantage over other users are explicitly against the rules. This includes but not limited to:
├> Using macros/scripts for any commands
└> Using multiple accounts for any reason

• Do **not** use any exploits and report any found in the bot

• You can **not** sell/trade cowoncy or any bot goods for anything outside of the bot

• If you have any questions come ask us in our [server](${client.destek})!

*OwO what's this? You agreed to these rules! <3.*`).setColor('GREEN')
)
  db.set(`Kurallar_${message.author.id}`,true)
  db.add(`Kabul`,1)
  db.set(`Dil_${message.author.id}`,'en')
  }
  })
  })
  })
  })
  })
  }
 /*if (PepeCode.has(message.author.id)) {
  return;
  }*/
  PepeCode.add(message.author.id)
  setTimeout(() => {
  PepeCode.delete(message.author.id)
  }, 2500)
  if (cmd.conf.permLevel === 3 && !ayarlar.sahip.includes(message.author.id) && message.member.hasPermission('ADMINISTRATOR') && db.fetch(`Dil_${message.author.id}`) == 'en') return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('\\❌ You must have administrator permission!')).then(Error => Error.delete({timeout:5000}))
  if (cmd.conf.permLevel === 3 && !ayarlar.sahip.includes(message.author.id) && message.member.hasPermission('ADMINISTRATOR') && db.fetch(`Dil_${message.author.id}`) == 'tr') return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('\\❌ Yönetici yetkinin olması gerek!')).then(Error => Error.delete({timeout:5000}))
  if (cmd.conf.permLevel === 4 && !ayarlar.sahip.includes(message.author.id) && db.fetch(`Dil_${message.author.id}`) == 'en') return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('\\❌ You must be bot owner!')).then(Error => Error.delete({timeout:5000}))
  if (cmd.conf.permLevel === 4 && !ayarlar.sahip.includes(message.author.id) && db.fetch(`Dil_${message.author.id}`) == 'tr') return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('\\❌ Botun kurucusu olman gerek!')).then(Error => Error.delete({timeout:5000}))
  cmd.run(client, message, params)
  }
}