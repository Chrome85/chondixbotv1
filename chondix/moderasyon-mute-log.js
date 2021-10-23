const Discord = require('discord.js')
const data = require('wio.db');
exports.run = async(client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send(new Discord.MessageEmbed()
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif')
        .setColor("RED")
        .setTitle('Bir hata oldu! ')
        .setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`))
        
        
        if(!message.mentions.channels.first()) 
        return message.channel.send(new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Bir hata oldu! ')
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setDescription('Bir kanal etiketlemeyi unuttunuz.'));
  
  
        let mentionChannel = message.mentions.channels.first();
  
        data.set(`mute.log.${message.guild.id}`, mentionChannel.id);
  
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Başarılı!')
        .setColor("GREEN")
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setDescription(`Mute sistemi başarıyla ${mentionChannel} kanalı olarak seçtiniz.`));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'mute-log',
};