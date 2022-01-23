const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
module.exports = (client) => {
    if (!db.fetch('Kabul')) db.set('Kabul',1)
    if (!db.fetch('Botlar')) db.push('Botlar',`y${client.user.id}`)
    client.user.setActivity(`${ayarlar.prefix}help | ${ayarlar.prefix}invite`,{ type: 'PLAYING'} )
    console.error(`${client.user.username} Aktif! ${client.guilds.cache.size} Sunucu, ${client.guilds.cache.reduce((a,b) => a+b.memberCount,0).toLocaleString()} Kullanıcı!`)
}