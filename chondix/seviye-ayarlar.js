const Discord = require('discord.js');

const db = require("wio.db");

exports.run = async (client, message, args) => {
  
        	 let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)

let kanal = await db.fetch(`seviyekanal${message.guild.id}`)

let xp = await db.fetch(`seviyexp${message.guild.id}`)

let sınır = await db.fetch(`seviyesınır${message.guild.id}`)

let kanal1 = [];

  if(kanal) kanal1 = `<a:dnya:778787223847829504> **Açık!**`

  if(!kanal) kanal1 = `<a:dnya:778787223847829504> **Kapalı!**`

  let xp1 = [];

  if(xp) xp1 = `<a:dnya:778787223847829504> \`${xp}\``

  if(!xp) xp1 = `<a:dnya:778787223847829504> **Ayarlanmamış! Default: \`250\`**`

let sınır1 = [];

  if(sınır) sınır1 = `<a:dnya:778787223847829504> \`${sınır}\``

  if(!sınır) sınır1 = `<a:dnya:778787223847829504> **Ayarlanmamış! Default: \`5\`**`

message.channel.send(new Discord.MessageEmbed()

.setColor("#f6ff00")

.setTitle(`${message.guild.name} Sunucusuna Ait Seviye Ayarları!`)   

.addField(`**Seviye-Log**`, `${kanal1}`)

.addField(`**Mesaj Başı Verilecek Xp**`, `${xp1}`)     

.addField(`**Kaç Puan Seviye Atlama**`, `${sınır1}`))

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviye-ayarlar'

};