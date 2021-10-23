const discord = require('discord.js')
const db = require('wio.db');

exports.run = async(client, message, args) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`<a:dikkat:707520390242631804>Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın!`);

if (args[0] === 'sıfırla') {
  let isim = db.fetch(`otoisim_${message.guild.id}`)
  if (!isim) return message.channel.send(`<a:dikkat:707520390242631804>Oto İsim AYarlanmadığı İçimn Sıfırlanamaz!`)
  message.channel.send(`Oto İsim Sıfırlandı!<a:tiks:743841333692727378>`)
  db.delete(`otoisim_${message.guild.id}`)
  return;
}

let isim = args.slice(0).join(' ')
if (!isim) return message.channel.send(`İsim Belirtiniz!<a:dikkat:707520390242631804>`)

db.set(`otoisim_${message.guild.id}`, isim)

message.channel.send(`Oto İsim \`${isim}\` Olarak Ayarlandı!<a:tiks:743841333692727378>`)
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: ['oto-isim'],
  permlevel: 0
}
exports.help = {
  name: 'otoisim'
}