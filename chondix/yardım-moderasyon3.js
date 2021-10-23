const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`moderasyon yardım menüsü`)
.addFields(
    {name:`> .sa-as aç-kapat`,value: `Otomatik Selamlamayı Açar/Kapatır.`},
    {name:`> .otorol `,value:`Gelenlere Rol Verir.`},
    {name:`> .ototag `,value:`Gelenlere Tag Verir.`},
    {name:`> .ototag-kapat`,value:`Ototag Sistemini Kapatır.`},
    {name:`> .sayaç <sayı> <#kanal> `,value:` Sayaç Ayarlarsınız.`},
    {name:`> .sil `,value:`Belirli Sayıda Mesaj Siler.`},
    {name:`> .yavaş-mod`,value:`Sohbete Süre Ayarlar.`},
    {name:`> .modlog `,value:`Modlogu ayarlar.`},
    {name:`> .ban-log`,value:`Ban Log Kanalı Ayarlarsınız.`},
    {name:`> .ban-yetkili-rol `,value:`Sadece Kimler Banlayabilir?`},
    {name:`> .ban <@üye> <sebep> `,value:` Kişiyi Banlarsınız.`},
    {name:`> .unban <KişiID> <Sebep>  `,value:`Belirtiğiniz Kişinin Banını Açar`},
    {name:`> .banaffı  `,value:`Bütün Yasaklıların Banını Açar.`},
    {name:`> .kick-log`,value:`Kick Log Kanalı Ayarlarsınız.`},
    {name:`> .kick-yetkili-rol `,value:`Sadece Kimler Kick Atabilir?`},
    {name:`> .kick <@üye> <sebep>  `,value:`Kişiyi Sunucudan Kicklersiniz.`},
    {name:`> .jail-kanal ayarla`,value:`Jail Log Kanalını Ayarlarsınız.`},
    {name:`> .jail-yetkilisi ayarla`,value:` Sadece Kimler Jail Atabilir?`},
    {name:`> .jail-rol ayarla`,value:` Jail Verilecek Rol.`},
    {name:`> .jail @üye <10s,10m,10h,10d> sebep`,value:`Kişiye Jail Rolünü Verirsiniz.`},
    {name:`> .panel-kur`,value:`Sunucu Kanallarını Açar`},
    {name:`> .panel-sil`,value:` Panel Kanallarını Siler`},
    {name:`> .çoklusil`,value:`ÇMesaj Silersiniz`},
    {name:`> .guard`,value:`Guard Komutları görüntülersiniz`}
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
    name: "moderasyon"
}