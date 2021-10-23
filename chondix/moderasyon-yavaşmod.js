const Discord = require('discord.js');
const db = require('wio.db')

exports.run = async(client, message, args) => {
    let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  

if (message.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new Discord.MessageEmbed()
                .setDescription(`Doğru kullanım: \` .yavaş-mod [0/15]\``)
                .setColor("#f6ff00")
                .setTimestamp()
            message.channel.send({embed})
            return
          }
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('``Bu komutu kullanabilmek için`` **Yönetici** ``yetkisine sahip olmalısın``')
if (limit > 15) {
    return message.channel.send(new Discord.MessageEmbed().setDescription("Süre limiti maksimum **15** saniye olabilir.").setColor("#f6ff00"));
}
    message.channel.send(new Discord.MessageEmbed().setDescription(` Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`).setColor("#f6ff00"));
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
  permLevel: 3,
};

exports.help = {
  name: 'yavaş-mod',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaş-mod [1/120]',
};