const Discord = require("discord.js");
const db = require('wio.db');

module.exports.run = async (bot, message, args) => {
    let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
    
  

let replies = ["https://cdn.discordapp.com/attachments/694693923486171177/737203415339499621/a_c3451f3e42065b560180028d3a62ef5a.gif","https://cdn.discordapp.com/attachments/694693923486171177/737219168822362183/a_9c8d6cb51559b033674ed8dd16234ee7.gif","https://cdn.discordapp.com/attachments/694693923486171177/737219065977765888/a_cb483fd9bfa2068e5b57aa6cf973986e.gif","https://cdn.discordapp.com/attachments/694693923486171177/737203076691394570/a_e8727598fec06c471cc305358b97596b.gif","https://cdn.discordapp.com/attachments/694693923486171177/737106443932532796/gif_200.gif","https://cdn.discordapp.com/attachments/694693923486171177/737106458080051330/gif_201.gif","https://cdn.discordapp.com/attachments/694693923486171177/737050698293968976/a_a873a018a2751ecaf654d116ae15c261.gif","https://cdn.discordapp.com/attachments/694693923486171177/737105973155463259/gif_180.gif","https://cdn.discordapp.com/attachments/694693923486171177/737106004977647726/gif_182.gif","https://cdn.discordapp.com/attachments/694693923486171177/737106176541589544/gif_187.gif","https://cdn.discordapp.com/attachments/694693923486171177/737106247643562004/gif_191.gif","https://cdn.discordapp.com/attachments/694693923486171177/737106368158367804/gif_196.gif","https://cdn.discordapp.com/attachments/694693923486171177/737013617538629722/a_fb64ba0c5d3b48b24d4334d7ac2b70af.gif","https://cdn.discordapp.com/attachments/694693923486171177/737013649058824252/a_ee0eab432a8d1eb6521c1a932dd04e22.gif","https://cdn.discordapp.com/attachments/694693923486171177/737038327672340541/a_2df0464c0f0e4dabf60385103b18addd.gif","https://cdn.discordapp.com/attachments/694693923486171177/737038499043213332/a_b4cad593a04df36fae504536a7971825.gif","https://cdn.discordapp.com/attachments/694693923486171177/737039041022787624/image0.gif","https://cdn.discordapp.com/attachments/694693923486171177/737039232065077269/image0-70.gif","https://cdn.discordapp.com/attachments/694693923486171177/737039292832153640/kaan.gif.gif","https://cdn.discordapp.com/attachments/694693923486171177/737203076691394570/a_e8727598fec06c471cc305358b97596b.gif","https://media.discordapp.net/attachments/751141846138355842/751148738063499304/8db190e8ac8d3529961474032c1664bd.gif?width=393&height=492","https://media.discordapp.net/attachments/751141846138355842/751148304649158757/a_28acf5913ee77c7cb49ab897299cd69c.gif","https://media.discordapp.net/attachments/751141846138355842/751146709983428730/a_f71efc98fbdd7efbaea161dc7f46137a.gif","https://media.discordapp.net/attachments/751141846138355842/751148739078520934/tenor.gif","https://media.discordapp.net/attachments/751141846138355842/751181422194065520/186.gif","https://media.discordapp.net/attachments/751141846138355842/751181652511817738/a_664bb1de30aea92ae91fa56b93f3f3d0.gif","https://media.discordapp.net/attachments/751141846138355842/751186752361726082/ados_man18.gif","https://media.discordapp.net/attachments/751141846138355842/751186881550614594/ados_man31.gif","https://media.discordapp.net/attachments/751141846138355842/751187071992987868/ados_man27.gif","https://media.discordapp.net/attachments/751141846138355842/751349961324757032/2.gif","https://media.discordapp.net/attachments/751141846138355842/751356931301441556/a_df7c2887acbcd1d50b90dfa4416435ba.gif"];

let result = Math.floor((Math.random() * replies.length));
  
let gifembed = new Discord.MessageEmbed()

.setTitle(" Man Gif ")

.setColor("#f6ff00")

.setFooter(`${message.author.tag} `, message.author.avatarURL)

.setImage(replies[result]);

message.channel.send(gifembed);

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ['gif-man','man-gif','gifman','mangif'],

  permLevel: 0

};

exports.help = {

  name: 'man-gif',

  description: 'Darknes Code',

  usage: 'man'

};