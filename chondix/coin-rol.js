const discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
    if(!message.guild) return
      const rolid = args[0]
      const kaçcoindeverilecek = args[1]
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    const yetkinyok = new discord.MessageEmbed()
      .setAuthor("❌ Yetersiz Yetki!")
      .setColor("RED")
      .setDescription("**Bu Komudu Kullanabilmek İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
      return message.channel.send(yetkinyok)
  }
  if(!rolid) {
      const rolidyok = new discord.MessageEmbed()
      .setAuthor("❌ Eksik Argüman!")
      .setDescription("**Rol ID'si Belirmelisin!**")
      .setColor("RED")
      return message.channel.send(rolidyok)
  }
  if(!kaçcoindeverilecek) {
      const kaçcoinde = new discord.MessageEmbed()
      .setAuthor("❌ Eksik Argüman!")
      .setColor("RED")
      .setDescription("**Kaç Coinde Belirttiğiniz Rolün Verilmesini İstiyorsanız Onu Girin**")
      return message.channel.send(kaçcoinde)
  }
  const rolfetch = message.guild.roles.cache.get(rolid)
  if(rolfetch == undefined) {
      const böylerolyok = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setDescription("**Bu Rol ID'si Bu Sunucuda Yok**")
      .setColor("RED")
      return message.channel.send(böylerolyok)
  }
  if(isNaN(kaçcoindeverilecek)) {
      const sadecesayi = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setColor("RED")
      .setDescription("**Kaç Coinde Rolün Verileceğini Sadece Sayı Olarak Belirtebilirsiniz**")
      return message.channel.send(sadecesayi)
  }
  db.push(`objcoin_${message.guild.id}`, {"rolID": rolid, "kacCoinLazim": kaçcoindeverilecek})
  const sucembed = new discord.MessageEmbed()
  .setAuthor("✅ Başarılı")
  .setDescription("**Ayarlandı!**")
  .setColor("GREEN")
  message.channel.send(sucembed)
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["coin-rol"],
  permLevel: 0
};
exports.help = {
  name: "coin-rol",
  description: "coin rol işte",
  usage: "coin-rol <coin sayısına ulaşınca verilecek rol id> <coin sayısı>"
};