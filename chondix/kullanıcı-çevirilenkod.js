const Discord = require("discord.js");
const db = require('wio.db');
exports.run = (client, message, args, member) => {
  let çevrilenkod = db.get(`çevrilenkod`);
const embed = new Discord.MessageEmbed()
  .setColor("#f6ff00")
  .setDescription(` \n **Toplam Çevrilen Kod Sayısı:** ${çevrilenkod}`)
.setImage("https://cdn.discordapp.com/attachments/767544528537649193/782343766446964746/standard_2.gif")
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["say"],
    permLevel: 0
}

exports.help = {
    name: "çevrilenkod",
    description: "kodçevirme",
    usage: "kodçevirme"
}