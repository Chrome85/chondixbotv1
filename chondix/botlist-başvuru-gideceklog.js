const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('wio.db');
module.exports.run = async (client, message, args) => {
  let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  
  
  
  if(message.author.id !== message.guild.owner.user.id) return message.reply(' Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!')
  let prefix = "."
  let kanal = message.mentions.channels.first();
    if (!kanal) {
      message.channel.send(` Bir kanal etiketlemelisin!`);
      return;
    }
 db.set(`westrabasvurugidecekkanal_${message.guild.id}`, kanal.id);
  message.channel.send(`<a:okk:778774339259859002> Başvuru gidecek kanal başarıyla ${kanal} olarak ayarlandı!`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'başvuru-gidecek-kanal-ayarla', 
  description: "Sunucuya eklenen botu reddeder.",
  usage: 'botreddet <bot ismi> - <sebep>'
};