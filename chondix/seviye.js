const Discord = require('discord.js');

const db = require("wio.db");

const ayarlar = require("../ayarlar.json")

exports.run = async(client, message, args) => {


  var user = message.mentions.users.first() || message.author;

  var id = user.id

  var gid = message.guild.id;

  

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  let u = message.mentions.users.first() || message.author;

  if(u.bot === true) { message.channel.send(new Discord.MessageEmbed()

                        .setDescription(" Botların seviyesi bulunmamaktadır!")

                        .setColor("RANDOM"))}  

  else 

  message.channel.send(new Discord.MessageEmbed()

  .setColor("#f6ff00")

  .setAuthor(`${user.username}`, user.avatarURL())

  .setThumbnail(user.avatarURL)                     

  .setTitle(`Seviye Bilgisi:`)                 

  .addField(`Kullanıcı:`, `<@${user.id}>`, true)

  .addField(`Kullanıcı Xp Değeri:`, `**${xp || 0}**`, true)   

  .addField(`Kullanıcı Seviye Değeri:`, `**${lvl || 0}**`, true)

  .setFooter(`${client.user.username} Seviye Sistemi!`, client.user.avatarURL())   

  .setTimestamp())

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviyebilgi'

};