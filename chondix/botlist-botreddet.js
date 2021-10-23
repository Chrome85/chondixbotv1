const Discord = require('discord.js');
const db = require('wio.db');


module.exports.run = async (client, message, args) => {
  let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  
  
  let kanal = await db.fetch(`westrabasvuruyapılacakkanal_${message.guild.id}`);
  let kanal2 = await db.fetch(`westrabasvurugidecekkanal_${message.guild.id}`);
  let kanal3 = await db.fetch(`westralogkanal_${message.guild.id}`);
  let westrabasvurugidecekkanal = await db.fetch(`westrabasvurugidecekkanal_${message.guild.id}`, kanal2.id);
let westralogkanal = await db.fetch(`westralogkanal_${message.guild.id}`, kanal3.id);
let westrabotlistyetkilisi = db.fetch(`westrabotlistyetkilirol_${message.guild.id}`)
   if(!message.member.roles.cache.has(westrabotlistyetkilisi)) return message.channel.send(` Bu komutu kullanabilmen için <@&${westrabotlistyetkilisi}> adlı role sahip olman lazım!`)
	let botisim = args[0]
  let sahip = args[1]
  let sebep = args.slice(2).join(' ');
	let log = westralogkanal // Bot Eklendi / Onaylandı / Rededildi Kanalı
	if (!botisim) return message.channel.send(` Botun ID'sini yazmalısın.`).then(x => x.delete({timeout: 3000}))
      if (!sahip) return message.channel.send(` Bot sahibinin ID'sini yazmalısın.`).then(x => x.delete({timeout: 3000}))
   if (!sebep) return message.channel.send(` Botun onaylanmama sebebini yazmalısın.`).then(x => x.delete({timeout: 3000}))
  message.delete()
   const westrabumbeyyyy = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setFooter(`Chondix BotList Sistemi`)
    .setTimestamp()
    .setDescription(` <@${sahip}> adlı kişinin <@${botisim}> adlı botu reddedildi. \n**Sebep:** \`${sebep}\` \n**Reddeden yetkili:** ${message.author}`)
		client.channels.cache.get(log).send(westrabumbeyyyy);// 
		message.channel.send(`<a:okk:778774339259859002> Botu reddettiniz.`).then(x => x.delete({timeout: 3000}))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'botreddet', 
  description: "Sunucuya eklenen botu reddeder.",
  usage: 'botreddet <bot ismi> - <sebep>'
};