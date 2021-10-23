const Discord = require('discord.js')
const data = require('wio.db');
exports.run = async(client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) 
        return message.channel.send(new Discord.MessageEmbed()
        .setThumbnail(message.author.avatarURL({dynamic: true}))
        .setTitle('Bir hata oldu!')
        .setColor("RED")
        .setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`));
  
  
        if(!message.mentions.roles.first()) 
  return message.channel.send(new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('Bir hata oldu!')
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .setDescription('Bir rol etiketlemeyi unuttunuz.'));
  
  let mentionRole = message.mentions.roles.first();

  
  data.set(`muteyetki.role.${message.guild.id}`, mentionRole.id);
  
  message.channel.send(new Discord.MessageEmbed()
  .setTitle('Başarılı!')
  .setColor(`GREEN`)
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .setDescription(`Mute yetkisi olarak kullanılacak: ${mentionRole} rolü olarak seçtiniz.`));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["muteyetkilirol"],
  permLevel: 0
};

exports.help = {
  name: 'mute-yetkili-rol',
};