const data = require('wio.db')
const ayarlar = require('../ayarlar.json')
const Discord = require('discord.js')
const ms = require('ms')
exports.run = async(client, message, args) => {
let prefix = ayarlar.prefix;
const logChannel = await data.fetch(`mute.log.${message.guild.id}`);
const muteYetkili = await data.fetch(`muteyetki.role.${message.guild.id}`);
if(!logChannel) return;
if(!muteYetkili) return;

const errorEmbed = new Discord.MessageEmbed()
.setColor("#f6ff00");
const errorEmbed2 = new Discord.MessageEmbed()
.setTitle('Bir hata oldu! ');

if(!message.member.permissions.has(muteYetkili)) return message.channel.send(errorEmbed.setDescription(`${message.guild.roles.cache.get(muteYetkili)} | Rolüne sahip olman gerekiyor.`));
if(!args[0]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu! ').setDescription(`Kullanıcı etiketleyerek dener misin?
**Örnek olarak**:
\`\`\`${prefix}sesmute @üyeetiketi 1m merhaba
${prefix}sesmute 686185592899633200 1m merhaba\`\`\``));

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first();
} else if(args[0]) {
member = message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(errorEmbed.setTitle('Bir hata oldu! ').setDescription(`Kullanıcı etiketleyerek dener misin?
**Örnek olarak**:
\`\`\`${prefix}sesmute @üyeetiketi 1m merhaba
${prefix}sesmute 686185592899633200 1m merhaba\`\`\``));
}

if(!member.voice.channel){
    return message.channel.send(` | **Etiketlediğiniz Kişi Bir Sesli Kanalda Değil!**`)
}


if(message.author.id === member.id) return message.channel.send(new Discord.MessageEmbed().setColor("#f6ff00").setTitle('Agaa beeeeeeeee!').setDescription(`O kadar yürekli olamazsın.. 🙄`))
if(member.permissions.has('ADMINISTRATOR')) return message.channel.send(errorEmbed2.setDescription('**Yönetici bir kullanıcıya karışamam!**'));

if(!args[1]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu! ')
.setDescription(`${message.author} **Süre** Belirtmeyi unutma lütfen! \`1s & 1m & 1h & 1d\` kullanarak dener misin?
**Örnek olarak**:
\`\`\`${prefix}sesmute @üyetiketi 1m merhaba\`\`\``));

let cooldown = ms(args[1]);
let reason;
if(args[2]) reason = args[2];
if(!args[2]) reason = 'Bir açıklama yok.';


message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed()
.setColor("#f6ff00")
.setTitle('Chondix - Sesli Mute Sistem')
.setDescription(`
 **Kullanan Yetkili:** ${message.author.tag}
 **Kullanılan kişi:** ${member.user.tag}
 **Açıklama:** ${reason}
 **Ceza Süre:** ${args[1]}`)
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png'));
member.voice.setMute(true);

setTimeout(() => {

message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed()
.setTitle('Chondix - Sesli  Mute Sistem').setColor("#f6ff00")
.setDescription(`
 ${member.user} **kullanıcısının sesli mute süresi bitti!**
`))
member.voice.setMute(false);
}, cooldown);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ses-mute"],
  permLevel: 0
};

exports.help = {
  name: 'sesmute',
};