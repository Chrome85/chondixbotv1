const Discord = require('discord.js')
const db = require('wio.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  if(db.fetch(`bakim`)) {
  const bakim = new Discord.MessageEmbed()
  .setColor("#FF56FF")
  .setThumbnail(message.author.avatarURL())
  .setTitle('Üzgünüm Bot Bakımda')
  .addField('Bot Şuan Bakımdadır Lütfen Bekleyin.','Bot Ne Durumda Yada Botla İlgili Güncelleme Ve Duyurular İçin Destek Sunucumuza Gelmeyi Unutmayınız.')
  .addField('İşte Destek Sunucum',"[Destek Sunucusu](https://discord.com/invite/SANuqz8vNq)")
  .setFooter('Üzgünüm...')
  .setImage('https://lh3.googleusercontent.com/proxy/5tAJATkhQI1Iqne6RqrCoHOlebQpG-fJhTC5gnmk3uFEmTWd8owrB51Ul5VLE05zGwa9iTBTpS7RDncAf22rCvCOMi9F7qz87n-yoNLQfUbPPA')
 if(message.author.id !== "477189482206986240") return message.channel.send(bakim)
}
  
   var başarılı = ['**İŞTE BU!** ', '**SÜPER!** ', '**NASIL YAPTIN BUNU?!** ', '**MÜKEMMEL!** ', '**SEVDİM BUNU!** ', '**ŞİMDİ OLDU!** '];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** ', '**OLMADI BU!** ', '**HAY AKSİ!** ', '**HADİ ORADAN!** ', '**OLMADI YA!** ', '**BÖYLE OLMAZ?!** ', '**HADİ YA!** '];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**${ayarlar.prefix}jail-yetkilisi ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, q!jail-yetkilisi ayarla/sıfırla @rol yazmalısın.`)
   
  
  if (args[0] == 'ayarla') {
  
  let kanal = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args[1].join('-'))
  if (!kanal) return message.channel.send(x2 + ` Bir kanal etiketle.`)
  
  db.set(`jailkanal_${message.guild.id}`, kanal.id)
  message.channel.send(x + ` Jail logunun tutulacağı kanal ${kanal} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailkanal_${message.guild.id}`)
    message.channel.send(x + ` Jail logunun tutulduğu kanal başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailkanal'],
 permLevel: 0
};

exports.help = {
 name: 'jail-kanal',
 description: 'Birisi jaile atılınca hangi kanala mesaj atılacağını ayarlarsınız.',
 usage: 'jail-kanal ayarla/sıfırla #kanal',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};