const Discord = require('discord.js');
const db = require('wio.db');
const moment = require('moment')
const client = new Discord.Client();

exports.run = async(client, message, args) => {

let user = message.mentions.users.first() || message.member
let k =  db.fetch(`küfür_${message.guild.id}_${message.author.id}`) 
const mesaj = new Discord.MessageEmbed()
.setColor('#f6ff00')
.setDescription("<@!"+message.author.id+">, Bu Sunucuda Toplam **"+k+"** Kere Küfür Etmişsin!")
message.channel.send(mesaj)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'küfür-sayar',
  description: '',
  usage: 'mesaj-sayar'
};