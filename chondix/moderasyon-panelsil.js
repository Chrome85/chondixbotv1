const Discord = require('discord.js');
const db = require('wio.db')

exports.run = async (client, message) => {

	if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Yetkiniz Bulunmamaktadır!');
    let toplamuye = message.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
   let aktifüye = message.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
   let botlar = message.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
   let rekor = message.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
   let son = message.guild.channels.cache.find(x =>(x.name).startsWith("Son Üye •"))
   let ses = message.guild.channels.cache.find(x =>(x.name).startsWith("Seslideki Üye •"))
   let sunucu = message.guild.channels.cache.find(x =>(x.name).startsWith(`${message.guild.name}`));
   sunucu.delete()
 toplamuye.delete()
  aktifüye.delete()
  botlar.delete()
  rekor.delete()
  son.delete()
  ses.delete()
   
  db.delete(`sunucupanel.${message.guild.id}`)
    message.channel.send(`Panel Sıfırlandı`)
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'panel-sil', 
  description: 'Botu yeniden başlatır',
  usage: 'reboot'
};