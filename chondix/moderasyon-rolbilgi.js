const Discord = require("discord.js");
const superagent = require("superagent");
module.exports.run = async (client,message,args) => {
  var rol = message.content.split(" ").slice(1).join(" ");
  let role = message.guild.roles.find("name", `${rol}`)
  var hata = new Discord.RichEmbed()
  .setColor("#f6ff00")
  .setDescription("❌ Lütfen Bir Rol İsmi Yazın `Örnek: .rolbilgi Üye`");
  if(!role) return message.channel.send(hata);
  var moment = require("moment");
  var temps = moment(message.createdTimestamp).format("LLLL");
  var roleinfoEmbed = new Discord.MessageEmbed()
  .setColor("#f6ff00")
  .addField('✏️ Rol İsmi', role.name, true)
  .addField('🆔 ID', role.id, true)
  .addField('👥 Role Sahip Kullanıcılar', role.members.size, true)
  .addField('💙 Renk', role.hexColor, true)
  .addField('📣 Etiketleme?', role.mentionable ? '\nEvet' : 'Hayır', true)
  .addField('📅 Oluşturulduğu Zaman', moment(role.createdAt).format("LL"), true)
  .setFooter(`${role} Adlı Rolün Bilgileri.`);
  message.channel.send(roleinfoEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rolinfo', 'rolhakkında', 'rolbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'rolbilgi',
  description: 'rolinfo | Rol hakkında bilgi verir.',
  usage: 'rolbilgi <rolismi>'
};