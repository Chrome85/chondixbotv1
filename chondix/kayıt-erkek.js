const discord = require('discord.js')
const db = require('wio.db');

exports.run = async(client, message, args) => {
   let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)


let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let erkekrol = db.fetch(`erkekrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırol_${message.guild.id}`)
let n = db.fetch(`tagg.${message.guild.id}`);
let tag = db.fetch(`tag.${message.guild.id}`);


 
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(`** Bu komudu kullanabilmen için <@&${kayıtçı}> adlı role sahip olman lazım!**`)
if(message.channel.id !== kanal) return message.channel.send(`** Bu komudu sadece <#${kanal}> adlı kanalda kullanabilirsin!**`)
if (!erkekrol) return message.channel.send(`** Sunucuda erkek rolü ayarlanmadığı için komut kullanılamaz!**`)


let member = message.mentions.members.first();
if (!member) return message.channel.send(`** Erkek olarak kayıt edeceğin kullanıcıyı belirtmelisin!**`)
let isim = args[1]
if (!isim) return message.channel.send(`** İsmini belirtmelisin!**`)
let yaş = args[2]
if (!yaş) return message.channel.send(`** Yaşını belirtmelisin!**`)
if(isim && member) member.setNickname(`${n} ${isim} | ${yaş}`); 
if(isim && !n) member.setNickname(`${isim} | ${yaş}`);
member.roles.remove(alınacakrol)
member.roles.add(erkekrol)
const kayıtolan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //üyeyi çekiyoruz yani hem etiket hemde id ile olur.
let kayıtsohbet = db.fetch(`kayıtsohbet_${message.guild.id}`)

db.add(`erkekpuan_${message.author.id}`, 1)
  const hg = new discord.MessageEmbed()
.setColor('#f6ff00')
.setDescription('<a:hype:778788019548454912> KAYIT BİLGİLERİN ŞUNLAR ;')
.addField( `**Kaydın Başarıyla Yapıldı! **`,
    ` **Kayıt Edilen Kişi: ${kayıtolan}**
      **Kayıt Eden Yetkili: ${message.author}**
      **Kayıt İşleminde Verilen Rol: <@&${erkekrol}>**
      **Kayıt İşleminde Alınan Rol: <@&${alınacakrol}>**
      **Eski İsim: ${tag} İsim | Yaş**
      **Yeni İsim: ${tag} ${isim} | ${yaş}** 
   `)
.setFooter(`TAG Ayarlanmadıysa Undefined Yazması Normaldir!`);
message.guild.channels.cache.get(kayıtsohbet).send(hg);

const başarılı = new discord.MessageEmbed()
.setThumbnail(message.author.displayAvatarURL({dynamic : true}))
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} | Erkek Kayıt`)
.setColor("#f6ff00")
.setDescription(` Erkek olarak kayıt edilen kullanıcı: ${member} \n Erkek olarak kayıt eden yetkili: <@!${message.author.id}>`)
.addField(`Kullanıcının ismi:`, `${isim}`, true)
.addField(`Kullanıcının yaşı:`, `${yaş}`, true)
.setFooter(`Chondix Kayıt Sistemi`)
message.channel.send(başarılı)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['e'],
  permlevel: 0
}
exports.help = {
  name: 'erkek',
  description: 'erkek olarak kayıt eder',
  usage: 'dr!erkek @kullanıcı isim yaş'
}