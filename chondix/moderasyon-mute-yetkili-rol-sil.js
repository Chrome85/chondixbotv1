const Discord = require('discord.js')
const data = require('wio.db');
exports.run = async(client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) 
        return message.channel.send(new Discord.MessageEmbed()
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif')
        .setTitle('Bir hata oldu!')
        .setColor("RED")
        .setDescription(`Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmanız lazım.`))
        
  
        data.delete(`muteyetki.role.${message.guild.id}`);
  
        message.channel.send(new Discord.MessageEmbed()
  .setTitle('Başarılı!')
  .setThumbnail(message.author.avatarURL({dynamic:true}))
.setColor("GREEN")
  .setDescription(`Ayarlanmış mute yetkili rolü başarıyla silindi.`));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'muteyetki-sil',
};