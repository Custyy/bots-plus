const Discord = require("discord.js")
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const request = require('request')
let lang = {
tr:'',
en:''
}
exports.run = async (client, message, args) => {
//  client.users.fetch(await db.fetch(`BOT_${message.author.id}`)).then((User) => message.yanıtla(User.join('\n')))

  if (!ayarlar.sahip.includes(message.author.id)) return message.yanıtla('Bu Komutu Kullanmak İçin **`Sahibim`** Olman Lazım!')
  try {
    let codein = args.join(" ")
    let code = eval(codein)
    if (codein.length < 1) return message.yanıtla('Bir kod girmelisin !')
    if (codein == 'client.token') return message.yanıtla('Tokenim yok benim.')
    if (codein == 'ayarlar.token') return message.yanıtla('Tokenim yok benim.')
    if (codein == 'ayarlar') return message.yanıtla('Tokenim yok benim.')
    if (codein == '31') return message.yanıtla('Çok komik klajsfklasjflkjas')
    if (codein == 'lang.en') return message.yanıtla('Succesful.'),db.set(`Dil_${message.author.id}`,'en')
    if (codein == 'lang.tr') return message.yanıtla('Başarılı.'),db.set(`Dil_${message.author.id}`,'tr')
    if (typeof code !== 'string')    
    code = require('util').inspect(code, { depth: 0 })
    const Embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .addField('Kod', `\`\`\`js\n${codein}\`\`\``)
    .addField('Sonuç', `\`\`\`js\n${code}\n\`\`\``)
    message.yanıtla(Embed)
  } catch(error) {
    const Embed2 = new Discord.MessageEmbed()
    .setColor('RED')
    .addField('Hata', "\`\`\`js\n"+error+"\n\`\`\`")
    message.yanıtla(Embed2)
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
  }
  
  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'eval <kod>'
  }