const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`Kullanıcı yardım menüsü`)
.addFields(
    {name:`> .pp `,value: `Avatarınızı Atar`},
    {name:`> .tavsiye `,value:`Biz Yapımcılara Tavsiye Verirsiniz.`},
    {name:`> .bug-bildir`,value:`Botta Bug Varsa Biz Yapımcılara İletir.`},
    {name:`> .istek `,value:`İsteğinizi Belirtirsiniz.(SUNUCUDA)`},
    {name:`> .düello <@üye> `,value:` Düello Yaparsınız.`},
    {name:`> .mesaj-sayar`,value:`Toplam Mesaj Sayınızı Gösterir.`},
    {name:`> .resim-sayar`,value:`Toplam Resim Sayınızı Gösterir.`},
    {name:`> .küfür-sayar`,value:`Toplam Küfür Sayınızı Gösterir.`},
    {name:`> .reklam-sayar`,value:`Toplam Reklam Sayınızı Gösterir.`},
    {name:`> .kullanıcı-bilgi <@üye>`,value:`Kullanıcı'nın Bilgilerini Gösterir.`})
.setFooter(`Chondix`,client.user.avatarURL({dynamic:true}))
.setTimestamp()
.setImage(`https://cdn.discordapp.com/attachments/881928267140059136/899670482368987156/standard.gif`)
return message.channel.send(embed)
}
exports.conf = {
    aliases:[]
}
exports.help = {
    name: "kullanıcı"
}