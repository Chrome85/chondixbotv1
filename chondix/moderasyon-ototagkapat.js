const Discord = require('discord.js');
const db = require('wio.db')
const ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async(client, message, args) =>{
        	 let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  

  
let frenzy_ibrahim = await db.fetch(`Frenzy?Code?Ototag_${message.guild.id}`) || await db.fetch(`Frenzy?Code?OtotagKanal_${message.guild.id}`)
if(!frenzy_ibrahim) return message.reply(`:x: Bu sistem zaten kapalı durumda. Açmak için **${prefix}ototag rol kanal**`)
db.delete(`Frenzy?Code?Ototag_${message.guild.id}`) 
db.delete(`Frenzy?Code?OtotagKanal_${message.guild.id}`)
message.channel.send(` | **Ototag kapatıldı!**\n | **Yeni gelen kullanıcılara hiç bir rol vermeyeceğim.**`)
};  
exports.conf = {
  enabled: false, 
  guildOnly: false, 
  aliases: ['ototag-kapat'],
  permLevel: 0 
};
exports.help = {
  name: 'ototag-kapat',
  description: 'Ototag Sistemi - Chondix ',
  usage: 'ototagkapat'
};
