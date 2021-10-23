const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`Seviye yardım menüsü`)
.addFields(
    {name:`> .seviye-ayarlar`,value: `Seviye Ayarlarını Gösterir.`},
    {name:`> .seviye-log-ayarla <#kanal>`,value:` Seviye Atlayınca Mesaj Gidecek Kanal.`},
    {name:`> .seviye-rol`,value:`İstenilen Seviyeye Gelince Verilecek Rol`},
    {name:`> .seviye-sıfırla`,value:`Seviye Sistemini Sıfırlarsınız.`},
    {name:`> .seviye-sınır`,value:`Maksimum Kazanılanabilecek Seviyeyi Belirler`},
    {name:`> .seviye-xp`,value:` Bir Mesaj Başına Verilecek Xp yi ayarlar.`},
    {name:`> .seviye-top`,value:`Sunucuda ki En yüksek 5 Kişiyi Gösterir`},
    {name:`> .seviyerolleri`,value:`Hangi Seviye de Rol Verilecek Onu Gösterir.`},
    {name:`> .seviyebilgi`,value:`Seviyenizi Gösterir.`}
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
    name: "seviye"
}