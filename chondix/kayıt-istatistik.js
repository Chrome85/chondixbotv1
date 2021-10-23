const Discord = require("discord.js");
const db = require('wio.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {//splashen
  let kişi = message.mentions.users.first() || message.member
  let erkek = db.get(`erkekpuan_${message.author.id}`);
  let kız = db.get(`kızpuan_${message.author.id}`);
let toplam = erkek+kız
var embed = new Discord.MessageEmbed()
.setThumbnail(message.author.displayAvatarURL({dynamic : true}))
.setColor('#f6ff00')
.setDescription(`
●▬▬▬ <a:hkalp:781708345480183839> **Kayıt İstatistikleri** <a:hkalp:781708345480183839> ▬▬▬●

           >      • \`Yetkili\` • **${kişi}**
           >      • \`Toplam Üye Kayıt Sayısı\` • **${toplam}**
           >      • \`Toplam Erkek Kayıt Sayısı\` • **${erkek}**
           >      • \`Toplam Kadın Kayıt Sayısı\` • **${kız}**
              
●▬▬▬ <a:hkalp:781708345480183839> **Kayıt  İstatistikleri** <a:hkalp:781708345480183839> ▬▬▬●




`)
.setImage('https://cdn.discordapp.com/attachments/767544528537649193/782343767943413810/standard_3.gif')
message.reply(embed)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'toplam-kayıt'
};