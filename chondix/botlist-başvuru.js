const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('wio.db');
module.exports.run = async (client, message, args) => {
  let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  
  
  let prefix = "."
  let botid = (args[0])
  let prefix2 = (args[1])
  let onay = (args[2])
    if (!botid) {
      message.channel.send(` Bir botid yazmalısın!`);
      return;
    }
   if (!prefix2) {
    message.channel.send(` Bir prefix yazmalısın!`);
    return;
    }
     if (!onay) {
    message.channel.send(` Bot Onaylı mı? **Evet / Hayır**`);
    return;
    }
  let log = db.fetch(`westrabasvurugidecekkanal_${message.guild.id}`)
  const log2 = message.guild.channels.cache.get(log)
  const tamam = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setAuthor('Yeni Başvuru')
   .setDescription(`


**╭−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−╮**
**┊ ︵** -----------------------------------
**┊ ︵** **Bot Sahibi : \`${message.author.username}\` <@${message.author.id}>**
**┊ ︵** -----------------------------------
**┊ ︵** **Bot Sahibi ID : \`${message.author.id}\`**
**┊ ︵** -----------------------------------
**┊ ︵** **Bot ID : \`${botid}\`**
**┊ ︵** -----------------------------------
**┊ ︵** **Prefix : \`${prefix2}\`**
**┊ ︵** -----------------------------------
**┊ ︵** **Bot Onaylı mı ? : \`${onay}\`**
**┊ ︵** -----------------------------------
**┊ ︵** **Bot Davet Link : [Davet Link](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0)**
**┊ ︵** -----------------------------------
**╰−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−╯**
`) 
         message.delete();
log2.send(tamam)
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'başvuru', 
  description: "Sunucuya eklenen botu reddeder.",
  usage: 'botreddet <bot ismi> - <sebep>'
};