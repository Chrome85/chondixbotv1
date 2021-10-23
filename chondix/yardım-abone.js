const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`Sunucu Kur yardım menüsü`)
.addFields(
    {name:`> .abone-rol`,value: `Abone Rolünü Ayarlarsınız.`},
    {name:`> .abone-log`,value:`Abone Logunu Ayarlarsınız.`},
    {name:`> .aboneyrol`,value:`Abone Yetkili Rolünü Ayarlarsınız`},
    {name:`> .a`,value:`Abone Rolü Verirsiniz`},
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
    name: "abone"
}