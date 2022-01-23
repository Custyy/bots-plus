const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
execute: async(client,member) => {
if (!member.user.bot || !db.fetch('Botlar').toString().replace(/y/g,'').includes(member.id)) return
const fetchedLogs = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(Audit => Audit.entries.first()).catch(() => console.log(`${member.guild.name} Sunucusunda Yetkim Yok!`))
const executor = fetchedLogs.executor.id
const BOTBal = db.fetch(`BOTBal_${member.id}`)
if (BOTBal < 1) return
const user = await client.users.fetch(member.id)
const Rozetler = await user.fetchFlags()
const BotunRozetleri = Rozetler.toArray()
const status = BotunRozetleri.includes('VERIFIED_BOT')
let Onay;
if (status == false) Onay = ''
else Onay = '✅'

let Coin;
if (member.guild.memberCount > 2500) Coin = 2
else Coin = 1

if (db.fetch(`Dil_${executor}`) == 'en') {
if (member.guild.memberCount < 50) return db.push(`Log_${executor}`,`[0] Added a bot but server member count less then 50 (\`${`${Onay} `+member.user.tag}\`).`)
db.push(`Log_${executor}`,`[+${Coin}] Added a bot (\`${`${Onay} `+member.user.tag}\`).`)
db.add(`BOTBal_${member.id}`,-Coin)
db.add(`Coins_${executor}`,Coin)
db.set(`Add_${member.guild.id}_${member.id}`,{Adder: executor, Coin: Coin})
setTimeout(() => {
const FirstBots = db.fetch('Botlar').filter(Promo => Promo !== 'y'+member.id)
if (BOTBal < 1) db.set('Botlar',FirstBots),db.set(`BOTBal_${member.id}`,0)
},2500)
} else {
//if (member.guild.memberCount < 50) return db.push(`Log_${executor}`,`[0] Bir bot ekledi ama sunucudaki üye sayısı 50 den az (\`${`${Onay} `+member.user.tag}\`).`)
db.push(`Log_${executor}`,`[+${Coin}] Bir bot ekledi (\`${`${Onay} `+member.user.tag}\`).`)
db.add(`BOTBal_${member.id}`,-Coin)
db.add(`Coins_${executor}`,Coin)
db.set(`Add_${member.guild.id}_${member.id}`,executor)
setTimeout(() => {
const FirstBots = db.fetch('Botlar').filter(Promo => Promo !== 'y'+member.id)
if (BOTBal < 1) db.set('Botlar',FirstBots),db.set(`BOTBal_${member.id}`,0)
},2500)
}
}
}