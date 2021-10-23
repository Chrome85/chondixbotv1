const Discord = require('discord.js');
const db = require('wio.db');
const moment = require('moment')
const client = new Discord.Client();

exports.run = async(client, message, args) => {

let user = message.mentions.users.first() || message.member
let k =  db.fetch(`msayaraz_${message.guild.id}_${message.author.id}`) 
let b =  db.fetch(`msayarfazla_${message.guild.id}_${message.author.id}`) 
if(!k) k = 0
if(!b)  b = 0 
let sonuc = k+b  
const mesaj = new Discord.MessageEmbed()
.setColor('#f6ff00')
.setDescription("<@!"+message.author.id+">, bu sunucu da 10 harften az **"+k+"** mesaj,10 harften büyük **"+b+"** mesaj.Toplam da: **"+sonuc+"** mesaj atmış.")
message.channel.send(mesaj)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'mesaj-sayar',
  description: '',
  usage: 'mesaj-sayar'
};