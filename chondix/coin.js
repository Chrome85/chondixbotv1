const discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
      const mention = message.mentions.members.first()
    var id = null
    var username = null
    var avatar = null
    if(!mention){
      id = message.author.id
      username = message.author.username
      avatar = message.author.avatarURL({"dynamic": true})
    } else {
      id = mention.id
      username = mention.user.username
      avatar = mention.user.avatarURL({"dynamic": true})
    }


    var selector = null
    const fetchdata = db.fetch(`coin_${id}_${message.guild.id}`)
    if(fetchdata == null) {
      selector = "0"
    } else {
      selector = fetchdata
    }
    const sucembed = new discord.MessageEmbed()
    .setAuthor(username, avatar)
    .setDescription(`**Para Miktarınız: ${selector}**`)
    .setColor("GREEN")
    message.channel.send(sucembed)


}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["coin"],
  permLevel: 0
};
exports.help = {
  name: "coin",
  description: "coininize bakarsınız",
  usage: "coin <kullanıcı etiketi>"
};