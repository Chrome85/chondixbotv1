const Discord = require('discord.js');
const db = require('wio.db');

exports.run = async(client, message, args) => {
    let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  
  
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(' ```Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın```')

   	let kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send(' ```Kick Log kanalını belirtmelisin```')

    db.set(`kicklog_${message.guild.id}`, kanal.id)
   
    return message.channel.send(` | **Kick Log Kanalı Başarıyla <#${kanal.id}> Olarak ayarlandı!**`)
  
 }

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 0
};

exports.help = {
	name: "kick-log"
}