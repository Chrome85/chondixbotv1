const Discord = require('discord.js');

const db = require("wio.db");

exports.run = async(client, message, args) => {


 if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()

.setTitle(`Uyarı`)

.setDescription(` Bu Komutu Kullanmak İçin; \`ADMINISTRATOR\` Yetkisine Sahip Olmalısın!`))

  
  if(!args[0])  return message.channel.send(new Discord.MessageEmbed().setColor('#f6ff00').setDescription('> **Seviye Sisteminde ne yapmak istediğini belirtmedin** <a:sloading1:724733859534602350> \n> `.seviye-log ayarla #kanal` **Seviye-Log Sistemini Ayarlar** \n> `.seviye-log sıfırla` **Seviye-Log Sistemini Sıfırlar.**'))

  

   if(args[0] == "sıfırla") {

    db.delete(`seviyekanal${message.guild.id}`)

    return message.channel.send(` | **Seviye-Log sıfırlandı!**`);

  }

    

    

   if (args[0] == "ayarla") {

      let akanal =

        message.mentions.channels.first() ||

        message.guild.channels.cache.find(ff => ff.name === args.slice(1).join(" "));

      db.set(`seviyekanal${message.guild.id}`, akanal.id);

      message.channel.send(` | Seviye Log Kanalı Ayarlandı! Ayarlanan Kanal: <#${akanal.id}> **Sıfırlamak için** q!seviye-log sıfırla`)           
   
   }
}

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviye-log'

};