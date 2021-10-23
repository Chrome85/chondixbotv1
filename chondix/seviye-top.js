const Discord = require('discord.js');

const db = require("wio.db");

const ayarlar = require("../ayarlar.json")


exports.run = async(client, message, args) => {


if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()

.setTitle(`Uyarı`)

.setDescription(` Bu Komutu Kullanmak İçin; \`ADMINISTRATOR\` Yetkisine Sahip Olmalısın!`))

let user = message.author;

let id = message.author.id

let guild = message.guild;

let gid = message.guild.id

let sayi = 1

let map = message.guild.members.cache.filter(mem => !mem.user.bot).array().sort((a, b) => { return ( db.fetch(`lvl_${b.user.id}_${message.guild.id}`) || 0) - ( db.fetch(`lvl_${a.user.id}_${message.guild.id}`) || 0)  }).slice(0, 5).map(member => { return `\`#${sayi++}\` <@${member.user.id}> | **__Seviye:__** \`${( db.fetch(`lvl_${member.user.id}_${message.guild.id}`))}\` **__XP:__** \`${( db.fetch(`xp_${member.user.id}_${message.guild.id}`)) || `0`}\`` })

message.channel.send(new Discord.MessageEmbed()

.setColor("#f6ff00")

.setAuthor(`${message.guild.name} Seviye İlk 5`, client.user.avatarURL())

.setDescription(map)

.setFooter(`${client.user.username} Seviye-Top Sistemi!`, client.user.avatarURL()))

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviye-top'

};