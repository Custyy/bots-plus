const Discord = require('discord.js')
const client = new Discord.Client({disableEveryone: true})
const fs = require('fs')
const http = require('http')
const express = require('express')
const ayarlar = require('./ayarlar.json')
const app = express()
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
require('./util/eventLoader.js')(client)
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir('./src/', (Error, Files) => {
    if (Error) console.error(Error)
    Files.forEach(Pepe => {
        let Props = require(`./src/${Pepe}`)
        console.log(`[ ${moment().format('LLLL')} ] Yüklenen Komut: ${Props.help.name}`)
        client.commands.set(Props.help.name, Props)
        Props.conf.aliases.forEach(Alias => {
        client.aliases.set(Alias, Props.help.name)
})})})

client.on('ready', async () => {
client.destek = 'https://discord.gg/FkdThg2xp3'
client.oynuyor = `${ayarlar.prefix}help | ${ayarlar.prefix}invite`
client.davet = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
client.video = 'https://www.youtube.com/watch?v=oop9RZH5y7Y'
client.version = 'v1.0'
client.site = 'botsplus.gg'
})

client.on('message', async message => {
client.dil = db.fetch(`Dil_${message.guild.id}`) || 'tr_TR'
client.prefix = db.fetch(`Prefix_${message.guild.id}`) || ayarlar.prefix
if (message.content.includes == 'sıfırla') db.delete(`Dil_${message.author.id}`)
})

client.on('guildMemberRemove', async member => require('./events/guildMemberRemove.js').execute(client,member))
client.on('guildMemberAdd', async member => require('./events/guildMemberAdd.js').execute(client,member))

client.login(ayarlar.token).catch(() => console.error('[Token Error] Invalid Token Please Check Your Bot Token'))