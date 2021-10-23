const Discord = require('discord.js');
const data = require('wio.db')

exports.run = async (client, message, args) => {

  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.discordapp.com/attachments/779780476071575574/782329055117836328/31.gif')
.setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif')
.setTitle('Bir hata oldu!')
.setDescription(`• \`${client.ayarlar.prefix}tagrole-sil\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`));

  data.delete(`tag.role.${message.guild.id}`);
  message.channel.send(new Discord.MessageEmbed().setColor('#f6ff00')
.setTitle('İşte bu kadar!')
.setDescription(`Ayarlanmış **TAG** rolü başarıyla silindi.`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'tagrole-sil'
};