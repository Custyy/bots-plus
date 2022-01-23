const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
execute: async(client,member) => {
if (!member.user.bot || !db.fetch('Botlar').toString().replace(/y/g,'').includes(member.id)) return
//const fetchedLogs = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK' || 'MEMBER_BAN'}).then(Audit => Audit.entries.first()).catch(() => console.log(`${member.guild.name} Sunucusunda Yetkim Yok!`))
//const executor = fetchedLogs.executor.id
if(moment.duration(new Date().getTime() - member.joinedAt.getTime()).format('DD') > 30) return
const Adder = db.fetch(`Add_${member.guild.id}_${member.id}`)
if (Adder == null) return
const user = await client.users.fetch(member.id)
const Rozetler = await user.fetchFlags()
const BotunRozetleri = Rozetler.toArray()
const status = BotunRozetleri.includes('VERIFIED_BOT')
let Onay;
if (status == false) Onay = ''
else Onay = '✅'

let Coin;
if (member.guild.memberCount > 2500) Coin = Adder.Coin+Number(1)
else Coin = Adder.Coin+Number(1)

if (db.fetch(Adder.Adder) == 'en') {
db.push(`Log_${Adder.Adder}`,`[-${Coin}] Kicked the bot before 30 days passed (\`${`${Onay} `+member.tag}\`).`)
db.add(`BOTBal_${member.id}`,Adder.Coin)
db.add(`Coins_${Adder.Adder}`,-Coin)
} else {
db.push(`Log_${Adder.Adder}`,`[-${Coin}] 30 gün geçmeden botu attı (\`${`${Onay} `+member.tag}\`).`)
db.add(`BOTBal_${member.id}`,Adder.Coin)
db.add(`Coins_${Adder.Adder}`,-Coin)
}
}
}