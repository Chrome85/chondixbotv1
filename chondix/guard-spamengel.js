const Discord = require('discord.js');
const db = require('wio.db');

exports.run = async (client, message, args) => {
   let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  
  
  const nn = new Discord.MessageEmbed().setThumbnail();
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
const sistem = await db.fetch(`spam.${message.guild.id}`);
if(sistem) return message.channel.send(nn.setDescription(` Spam koruma zaten aktif.`)).then(a => a.delete({timeout: 10000}));

db.set(`spam.${message.guild.id}`, 'Chondix');
return message.channel.send(nn.setTitle(`İşlem başarılı!`).setColor('#f6ff00').setDescription(` Spam koruma başarıyla açıldı.`)).then(a => a.delete({timeout: 10000}));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['spam-engel', 'spamengel', 'spam-koruma', 'spamkoruma'],
  permLevel: 0
}

exports.help = {
  name: 'spam'
};
