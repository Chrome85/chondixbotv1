const Discord = require('discord.js');

exports.run = (client, message) => {
  
  const davet = new Discord.MessageEmbed()
  .setColor('#f6ff00')
  .setThumbnail('https://media.discordapp.net/attachments/720029424216440923/735255651638313061/727894683061321759.gif')
  .setDescription(`** Bot Davet Linki Ve Destek Sunucusu;**

**[Bot Davet](https://discord.com/oauth2/authorize?client_id=794616894572331009&scope=bot&permissions=8)**
**[Destek Sunucusu](https://discord.gg/5BVpnykd)** 



`)
  message.channel.send(davet)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "botdavet"
}