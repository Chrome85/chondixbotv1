const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`Kayıt yardım menüsü`)
.addFields(
    {name:`> .alınacak-rol`,value: `Kayıt Edince Alınacak Rol`},
    {name:`> .erkek-rol`,value:`Erkek Rolü Belirtirsiniz.`},
    {name:`> .erkek @etiket <isim> <yaş>`,value:`Erkek Kayıt Edersiniz.`},
    {name:`> .kayıt-hg`,value:`Kayıt Hoşgeldin Kanalı Belirtirsiniz.`},
    {name:`> .kayıt-kanal`,value:`Kayıtın Yapılacağı Kanalı Ayarlarsınız.`},
    {name:`> .kayıtçı-rol`,value:`Sadece Kimler Kayıt Edebilir.`},
    {name:`> .kız-rol`,value:`Kız Rolü Belirtirsiniz.`},
    {name:`> .kız @etiket <isim> <yaş>`,value:`Kız Kayıt Edersiniz.`},
    {name:`> .tagayarla <tag>`,value:` Kayıt Olanlara Tag Verir.`},
    {name:`> .toplam-kayıt`,value:`Kaç Adet Kayıt Yaptığınızı Görürsünüz.`}
)
.setFooter(`Chondix`,client.user.avatarURL({dynamic:true}))
.setTimestamp()
.setImage(`https://cdn.discordapp.com/attachments/881928267140059136/899670482368987156/standard.gif`)
return message.channel.send(embed)
}
exports.conf = {
    aliases:[]
}
exports.help = {
    name: "kayıt"
}