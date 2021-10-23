const Discord = require("discord.js");
exports.run = (client, message, args) => {
    let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
const westraben = new Discord.MessageEmbed()
.setColor("#f6ff00")
.setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
if(karaliste) 
return message.channel.send(westraben)

if(db.fetch(`bakim`)) {
const bakim = new Discord.MessageEmbed()
.setColor("#f6ff00")
.setThumbnail(message.author.displayAvatarURL({dynamic : true}))
.setTitle('Üzgünüm Bot Bakımda')
.addField('Bot Şuan Bakımdadır Lütfen Bekleyin.','Bot Ne Durumda Yada Botla İlgili Güncelleme Ve Duyurular İçin Destek Sunucumuza Gelmeyi Unutmayınız.')
.addField('İşte Destek Sunucum',"[Destek Sunucusu](https://discord.com/invite/SANuqz8vNq)")
.setFooter('Üzgünüm...')
.setImage('https://lh3.googleusercontent.com/proxy/gAN4I19oqqabXd_VIiwg5or-ITh4XxJTRNJA1ot0EIHPiBpxC74Atj4wNIcFes1N3VcE8WnOk6fIN29BChqNbj4lj9dIF2jiI7MBV6U8v842LA')
if(message.author.id != "477189482206986240") return message.channel.send(bakim)

}
  message.delete();
  let question = args.join(" ");
  let user = message.author.username;
  if (!question)
  
    return message.channel
      .send(
        new Discord.MessageEmbed().addField(`❌ **Yazı Yazman Gerek** ❌`)
      )
      .then(m => m.delete(5000));
  console.log(
    "oylama komutu " +
      message.author.username +
      "#" +
      message.author.discriminator +
      " tarafından kullanıldı."
  );
  message.channel
    .send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setFooter("Oylama Sistemi", client.user.avatarURL())
        .addField(`**Oylama**`, `**${question}**`)
    )
    .then(function(message) {
      message.react("✅");
      message.react("❌");
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oylama"],
  permLevel: 2
};
exports.help = {
  name: "oylama",
  description: "Oylama yapmanızı sağlar.",
  usage: "oylama <oylamaismi>"
};
