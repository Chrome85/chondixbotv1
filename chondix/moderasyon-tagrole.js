const Discord = require('discord.js');
const data = require('wio.db')

exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed()
.setColor('#f6ff00')
.setTitle('Chondix Tag Rol Sistemi')
.setDescription(`\`.rol-tag 🚀\`
**Lütfen tag ayarlayınız başlamadan önce**

\`.tag-role [@rolEtiket]\`
Sunucunuz da **tag** alan üyeye verilecek rolü etiketle

\`.tag-log [#kanalEtiket]\`
**Tag** alan & çıkaran üyeleri kanala bilgi olarak gönderir

\`\`\`Sıfırlama Komutları\`\`\`
\`.tagrole-sil\`
**Tagın ayarlı olan rolü siler**

\`.tag-log-kapat\`
**Ayarladığınız tag kanalı sıfırlar**

📢 Sistem Nasıl Çalışır?
**Buradaki herşeyi kurduktan sonra, \`Tag\` alan veya cıkartanın sunucunuz da herhangi bir kanala msj yazması durumunda alıp vermektedir.**
`)
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.discordapp.com/attachments/779780476071575574/782329055117836328/31.gif'))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'tagrol-sistem'
};