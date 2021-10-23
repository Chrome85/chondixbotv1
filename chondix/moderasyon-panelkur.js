const Discord = require('discord.js');
const db = require('wio.db')

exports.run = async (client, message) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Yetkiniz Bulunmamaktadır!');
  let count = 0
   let voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let panel = await db.fetch(`sunucupanel.${message.guild.id}`)
  if(panel) return message.channel.send(`Panel Zaten Ayarlanmış Silmek İçin; \`g!panel-sil\``)
  
  
let every = message.guild.roles.cache.find(r => r.name === '@everyone')
 message.guild.channels.create(`${message.guild.name}`, { type: 'category', reason: 'Bilgi Kanalları!' }).then(kategori => {
       kategori.createOverwrite(every, {
       CONNECT: false,
     })
   
   message.guild.channels.create(`Toplam Üye • ${message.guild.memberCount}`, { type: 'voice', reason: 'İstatistik' }).then(toplamüye => {
    message.guild.channels.create(`Aktif Üye • ${message.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`, { type: 'voice', reason: 'İstatistik' }).then(atkifüye => {
          message.guild.channels.create(`Botlar • ${message.guild.members.cache.filter(m => m.user.bot).size}`, { type: 'voice', reason: 'İstatistik' }).then(botlar => {
          message.guild.channels.create(`Rekor Aktiflik • ${message.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`, { type: 'voice', reason: 'İstatistik' }).then(rekor => {
            message.guild.channels.create(`Son Üye •`, { type: 'voice', reason: 'İstatistik' }).then(son => {
               message.guild.channels.create(`Seslideki Üye • ${count}`, { type: 'voice', reason: 'İstatistik' }).then(ses => {
                     
                     
                     
                     
   toplamüye.setParent(kategori.id)  
    atkifüye.setParent(kategori.id)
    botlar.setParent(kategori.id)
    rekor.setParent(kategori.id)
    son.setParent(kategori.id)
  ses.setParent(kategori.id)  
})})})})})})})
  db.set(`sunucupanel.${message.guild.id}`, message.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    message.channel.send(`Sunucu panel için gerekli kanallar oluşturulup, ayarlamalar yapıldı!  \`(Oda isimlerini değiştirmeyin, çalışmaz!)\``)
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'panel-kur', 
  description: 'Botu yeniden başlatır',
  usage: 'reboot'
};