const Discord = require('discord.js');
const data = require('wio.db')

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.discordapp.com/attachments/779780476071575574/782329055117836328/31.gif').setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif').setColor('#f6ff00').setTitle('Bir hata oldu!').setDescription(`• \`.tag\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`));

if(!args[0])  return message.channel.send(new Discord.MessageEmbed()
.setColor('#f6ff00')
.setTitle('Bir hata oldu!')
.setDescription(`${message.author} Bir **TAG** ve ya **SIMGE** koymayı unuttunuz.`));
if(args[0] === 'kapat') {
data.delete(`tag.${message.guild.id}`);
return message.channel.send(new Discord.MessageEmbed()
.setTitle('İşte bu kadar!')
.setColor('#f6ff00')
.setDescription('Mesaj tag sistemi başarıyla kapatıldı.'));
} else {
data.set(`tag.${message.guild.id}`, args.slice(0).join(' '));
return message.channel.send(new Discord.MessageEmbed()
.setTitle('İşte bu kadar!')
.setColor('#f6ff00')
.setDescription(`Mesaj tag sistemini başarıyla \`${args.slice(0).join(' ')}\` olarak seçtiniz.`));
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'tag'
};