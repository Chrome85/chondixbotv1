const Discord = module.require('discord.js');
const db = require("wio.db");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
const client = new Discord.Client();
module.exports.run = async (client, message, args) => {
  
  
  
       let kanal = message.guild.channels.cache.get(args[0]);
       
       if(!kanal) {
         message.channel.send('DC Yapmak İçin Kanal İdsini Giriniz. Doğru kullanım **.dc <sesli kanal id>**')
       } 
        if(kanal) {
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setColor('#f6ff00')
          .setDescription("Şanslı Kişi: " + kanal.members.random().user ? kanal.members.random().user : "Kanalda Kimse Yok")
          .setTimestamp()
           .setFooter(`${client.user.tag} DC Sistemi`)
          message.channel.send(embed)
        }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'dc'
};