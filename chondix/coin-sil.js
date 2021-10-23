const discord = require("discord.js")
const db = require("wio.db")

exports.run = async(client, message, args) => {
    var id = null
    var username = null
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      const yetkinyok = new discord.MessageEmbed()
      .setAuthor("❌ Yetersiz Yetki!")
      .setColor("RED")
      .setDescription("**Bu Komudu Kullanabilmek İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
      return message.channel.send(yetkinyok)
    }
      var para = args[1]
    const mention = message.mentions.members.first()


    if(!mention){
        id = message.author.id
        para = args[0]
        username = message.author.username
  
      } else {
        id = mention.id
        username = mention.user.username
      }

      if(!para) {
        const parabelirt = new discord.MessageEmbed()
        .setAuthor("❌ Eksik Argüman!")
        .setColor("RED")
        .setDescription("**Kişiye Vereceğin Para Miktarını Girmelisin!**")
        return message.channel.send(parabelirt)
      }
      if(isNaN(para)) {
        const sadecesayi = new discord.MessageEmbed()
        .setAuthor("❌ Yanlış Argüman!")
        .setColor("RED")
        .setDescription("**Para Sadece Rakamlardan Oluşabiir**")
        return message.channel.send(sadecesayi)
      } 
    const parse = parseInt(para)
   
    
console.log(parse)
console.log(id)
db.subtract(`coin_${id}_${message.guild.id}`, parse)
const sucembed = new discord.MessageEmbed()
.setAuthor("✅ Başarılı")
.setDescription(`**${username} Kişisinden ${parse} Kadar Para Silindi**`)
message.channel.send(sucembed)
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["coin-sil"],
  permLevel: 0
};
exports.help = {
  name: "coin-sil",
  description: "coin silersiniz",
  usage: "coin-sil <kullanıcı etiketi> <para miktarı>"
};