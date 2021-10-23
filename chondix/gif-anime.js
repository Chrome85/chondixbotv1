const Discord = require("discord.js");
const db = require('wio.db');

module.exports.run = async (bot, message, args) => {
    let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
    
  

let replies = ["https://cdn.discordapp.com/attachments/697505578972348436/737311070364106844/image0.gif","https://cdn.discordapp.com/attachments/694694884459937862/737296516774887505/bc500ed43e3593fcb9b10331ae644586.gif","https://cdn.discordapp.com/attachments/697505578972348436/737286213723226182/a_4a728888f25331995f9c61df26ffffdb.gif","https://cdn.discordapp.com/attachments/694694884459937862/737113186280538152/image0.gif","https://cdn.discordapp.com/attachments/697505578972348436/737052176106520687/image1.gif","https://cdn.discordapp.com/attachments/694694884459937862/737078026923409439/9190dc1cb39fa98fd9e12bb135aac545.gif","https://cdn.discordapp.com/attachments/697505578972348436/737052175754199070/image0.gif","https://cdn.discordapp.com/attachments/694694884459937862/736898906633273364/64.gif","https://cdn.discordapp.com/attachments/697505578972348436/737004415197904916/a_3bfd1dff4faab26f7a612a34cb2eb049.gif","https://cdn.discordapp.com/attachments/694694884459937862/735948576739426385/1.gif","https://cdn.discordapp.com/attachments/697505578972348436/736928294414450718/ROF8OQvDmxytW.gif","https://cdn.discordapp.com/attachments/694694884459937862/735948476520857650/5.gif","https://cdn.discordapp.com/attachments/697505578972348436/736757429450309673/image0.gif","https://cdn.discordapp.com/attachments/694694884459937862/735948187487174747/48.gif","https://cdn.discordapp.com/attachments/697505578972348436/736588684270239774/ezgif-6-e83305d159d6.gif","https://cdn.discordapp.com/attachments/694694884459937862/735948178855034955/anime_24.gif","https://cdn.discordapp.com/attachments/697505578972348436/736388428761137193/14Nqi9PD8H.gif","https://cdn.discordapp.com/attachments/694694884459937862/735948036202561677/previewfile_1877013475.gif","https://cdn.discordapp.com/attachments/697505578972348436/736388213421244477/Yblikw9Rj1.gif","https://cdn.discordapp.com/attachments/694694884459937862/735947565966688306/a_d6e522c9e10db64260eccb3c3455733c.gif","https://cdn.discordapp.com/attachments/697505578972348436/736388155229339708/zyJgqrsAUg.gif","https://cdn.discordapp.com/attachments/694694884459937862/735621470969135217/sasuke_al_moj.gif","https://media.discordapp.net/attachments/751141852182478858/751339962863059014/a_baa00fc0585383aa9a3e66aa5f3a733d.gif","https://media.discordapp.net/attachments/751141852182478858/751339965635493918/a_c0be1d3ac0948da45c7f472d044c71a7.gif","https://media.discordapp.net/attachments/751141852182478858/751340066747711488/a_ccf29be31a97f98fdcecbaa1b41f49cf.gif","https://media.discordapp.net/attachments/751141852182478858/751418355130564679/image0.gif","https://media.discordapp.net/attachments/751141852182478858/751418355914768484/178.gif","https://media.discordapp.net/attachments/751141852182478858/751418356162363462/176.gif","https://media.discordapp.net/attachments/751141852182478858/751418355428098088/115-1.gif","https://media.discordapp.net/attachments/751141852182478858/751366554150502420/ae89dc5dac6fa91f227c6e041a2eb0f3.gif","https://media.discordapp.net/attachments/751141852182478858/751366095969189888/bdba451126a2924451dd8582c2f35830-1.gif","https://media.discordapp.net/attachments/751141852182478858/751366095495233546/a_30e9d1c34b37ff49e684efafcf3423e0.gif","https://media.discordapp.net/attachments/751141852182478858/751366094723481640/image0_4-1.gif","https://media.discordapp.net/attachments/751141852182478858/751366094018576425/image3-2.gif"];

let result = Math.floor((Math.random() * replies.length));

let gifembed = new Discord.MessageEmbed()

.setTitle(" Anime Gif  ;")

.setColor("#f6ff00")

.setFooter(`${message.author.tag} `, message.author.avatarURL)

.setImage(replies[result]);

message.channel.send(gifembed);

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ['gif-anime','anime-gif','gifanime','animegif'],

  permLevel: 0

};

exports.help = {

  name: 'anime-gif',

  description: 'Darknes Code',

  usage: 'anime'

};