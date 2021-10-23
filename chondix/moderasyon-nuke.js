const Discord = require('discord.js');

exports.run = (client, message, args) => { 
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
.setColor('#f6ff00')
.setTitle(`Uyarı`)

.setDescription(`Bu Komutu Kullanmak İçin; \`ADMINISTRATOR\` Yetkisine Sahip Olmalısın!`))
message.channel.delete()
let limit = message.channel.userLimit;
let sıra = message.channel.position;
let toc = message.channel.topic;
let sapik = message.channel.nsfw;
let kategoriID = message.channel.parentID;
      message.guild.channels.create(message.channel.name,{type:message.channel.type}).then(kanal => {
      let z = kanal.guild.channels.cache.get(kanal.id)
      z.setParent(z.guild.channels.cache.find(channel => channel.id === kategoriID))
      z.edit({position:sıra,topic:toc,nsfw:sapik,userLimit:limit})
        const mesaj = new Discord.MessageEmbed()
        .setColor('#f6ff00')
        .setTitle('Başarılı!')
        .setDescription('Kanaldaki Bütün Mesajlar Silinmiştir.')
        .setFooter("Chondix'i Tercih Ettiğiniz İçin Teşekkürler!")
        z.send(mesaj)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'nuke',
  description: 'Kanalı temizler',
  usage: 'nuke'
};