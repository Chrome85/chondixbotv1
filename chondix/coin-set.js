const discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
    const belirt = args[0]
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyok = new discord.MessageEmbed()
        .setAuthor("❌ Yetersiz Yetki!")
        .setColor("RED")
        .setDescription("**Bu Komudu Kullanabilmek İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
        return message.channel.send(yetkinyok)
    }
    if(!belirt) {
        const selectoryok = new discord.MessageEmbed()
        .setAuthor("❌ Eksik Argüman!")
        .setDescription("**Coin Rol Sistemini Açmak Veya Kapatmak İstediğinizi Belirtmelisiniz**")
        .setColor("RED")
        return message.channel.send(selectoryok)
    }
    
    
    
    if(belirt == "aç") {
    db.set(`coinsistem_${message.guild.id}`, true)
    const acildi = new discord.MessageEmbed()
    .setAuthor("✅ Başarılı")
    .setColor("RED")
    .setDescription("**Coin Sistemi Açıldı**")
    message.channel.send(acildi)
    } else if(belirt == "kapat") {
    if(db.has(`coinsistem_${message.guild.id}`)) {
        db.delete(`coinsistem_${message.guild.id}`)
        const kapandi = new discord.MessageEmbed()
        .setAuthor("✅ Başarılı")
        .setDescription("**Coin Sistemi Kapandı**")
        message.channel.send(kapandi)
        }
    } else {
        const sadeceacmavekapama = new discord.MessageEmbed()
        .setAuthor("❌ Yanlış Argüman!")
        .setDescription("**Argüman Sadece aç veya kapat olabilir**")
        .setColor("RED")
        return message.channel.send(sadeceacmavekapama)
    }
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["coin-set"],
  permLevel: 0
};
exports.help = {
  name: "coin-set",
  description: "coin sistemini açmanızı veya kapatmanızı sağlar",
  usage: "coin-set <aç/kapat>"
};