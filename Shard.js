const Discord = require('discord.js')
const ayarlar = require('./ayarlar.json')
const express = require('express')
const client = new Discord.Client()
const app = express()
const http = require('http')
const Shard = new Discord.ShardingManager('./Main.js', { totalShards: 2,token: ayarlar.token })
Shard.on('launch', shard => {
 client.channels.cache.get(client.ayarlar.log).send(`[${shard.id}] Shard Başlatıldı.`)
})
Shard.spawn()

setTimeout(() => {
Shard.broadcastEval('process.exit()')
}, 21600000)