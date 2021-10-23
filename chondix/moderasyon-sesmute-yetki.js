const data = require('wio.db')
const Discord = require('discord.js')
exports.run = async(client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif')
        .setTitle('Bir hata oldu!')
        .setColor("RED")
        .setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`))        
        
        if(!message.mentions.roles.first()) 
        return message.channel.send(new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setTitle('Bir hata oldu!')
        .setDescription('Bir rol etiketlemeyi unuttunuz.'));
        
        
        let mentionRole = message.mentions.roles.first();
        data.set(`ses.muteyetki.role.${message.guild.id}`, mentionRole.id);
        
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Başarılı!')
        .setColor("GREEN")
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setDescription(`Ses Mute yetkisi olarak kullanılacak: ${mentionRole} rolü olarak seçtiniz.`));
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sesmute-yetkili-rol',
};