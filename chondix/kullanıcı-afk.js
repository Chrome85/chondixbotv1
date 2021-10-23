const Discord = require('discord.js');
const data  = require('wio.db');

exports.run = async (client, message, args) => {

if(message.author.id === message.guild.owner.user.id) return message.channel.send(new Discord.MessageEmbed()
.setColor("#f6ff00")
.setTitle('**Seni gidi seni, Sunucu sahibisin sana __AFK__ yakışmaz ^^**'));
if(!args[0]) reason = 'Bilgi verilmedi.';
if(args[0]) reason = args[0];

message.channel.send(new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png')
.setColor("#f6ff00")
.setTitle(`${client.user.username} - Away From Keyboard`)
.setDescription(`${message.author} **Üyesi Bilgisayar başında & Klavye başında değil**!\n\n• **Sebep:** \`${reason}\``)).then(a => a.delete({timeout: 10000}));
data.set(`name.${message.author.id}.${message.guild.id}`, message.member.displayName);
message.member.setNickname('[AFK] '+message.member.displayName);
data.set(`kullanıcı.${message.author.id}.${message.guild.id}`, reason);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'afk'
};