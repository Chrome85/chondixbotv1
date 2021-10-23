const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if(!args[0]) return message.channel.send(
  new Discord.MessageEmbed()
  .setColor("#f6ff00")
  .setDescription(`Bir ülke girmeyi unuttunuz!! Örnek: ${ayarlar.prefix}korona TR(TÜRKİYE) ,CH(CHINA), US(A.B.D), FR (FRANSA), NE(NORVEÇ), IS(İSVEÇ)`));
  let a = args[0].toLowerCase()
  .replace('türkiye', 'TR')
  .replace('çin', 'CH')
  .replace('amerika', 'US')
  .replace('japonya', 'JP')
  .replace('fransa', 'FR')
  .replace('norveç', 'NE')
  .replace('isveç',  'IS')
  
    const text = await snekfetch.get(`https://thevirustracker.com/free-api?countryTotal=${a}`);
    const body = text.body;
    let ülk = body.countrydata[0].info.title

    let darkcode = new Discord.RichEmbed()
    .setColor('0x00000')
    .setTitle('COVID-19')
    .setDescription(`COVID-19 İstatistikleri **${ülk}**`)
    .setThumbnail('https://dfcby4322olzt.cloudfront.net/wp-content/uploads/2020/03/1800x1200_coronavirus_1.jpg')
    .addField(' Toplam vaka sayısı:', body.countrydata[0].total_cases, true)
    .addField(' İyileşen:', body.countrydata[0].total_recovered, true)
    .addField(' Enfekte:', body.countrydata[0].total_active_cases, true)
    .addField(' Ölümler:', body.countrydata[0].total_deaths, true)
    .addField(' Bugün yeni vakalar:', body.countrydata[0].total_new_cases_today, true)
    .addField(' Bugün yeni ölümler:', body.countrydata[0].total_new_deaths_today, true)
    .addField(' Ciddi Vakalar:', body.countrydata[0].total_serious_cases, true)
    .setTimestamp()
    .setFooter('COVID-19 ', client.user.avatarURL);
    message.channel.send(darkcode);
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["corona", "covid", "covid19"],
  permLevel: 0 
};

exports.help = {
  name: 'korona',
  description: '',
  usage: ''
};