const discord = require('discord.js')
const db = require('wio.db');

exports.run = async(client, message, args) => {
  let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new discord.MessageEmbed()
 .setColor(`RED`)
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)

  
  

 if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send(' **Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın! **')
	
    if(!args[0])  return message.channel.send(new discord.MessageEmbed().setColor('#f6ff00').setDescription('> **Davet-Log Sisteminde ne yapmak istediğini belirtmedin** <a:loading:779796972533710868> \n> `.davet-log ayarla #kanal` **Davet-Log Sistemini Ayarlar** \n> `q!davet-log sıfırla` **Davet-Log Sistemini Sıfırlar.**'))

if (args[0] === 'sıfırla') {
  let kayıtsohbet = db.fetch(`kayıtsohbet_${message.guild.id}`)
  if (!kayıtsohbet) return message.channel.send(` Sohbete Yazı Zaten Ayarlanmadığı İçin Sıfırlanamaz! `)
  message.channel.send(` | **Sohbet Kanalı Başarıyla Sıfırlandı!**`)
  db.delete(`kayıtsohbet_${message.guild.id}`)
  return;
}

  if (args[0] === 'ayarla') {
let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(` | **Sohbet Kanalını Belirtmelisin!** `)

db.set(`kayıtsohbet_${message.guild.id}`, kanal.id)

message.channel.send(` | **Birisi Kayıt Olunca Hoşgeldin Mesajını ${kanal}'a Atacağım!**`)
  }
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-mesaj'
}