const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`Gif yardım menüsü`)
.addFields(
    {name:`> .animal-gif`,value: `Hayvan Gif'i Atar.`},
    {name:`> .anime-gif`,value:`Anime Gif'i Atar.`},
    {name:`> .baby-gif`,value:`Bebek Gif'i Atar`},
    {name:`> .couple-gif`,value:`Sevgili Gif'i Atar.`},
    {name:`> .man-gif`,value:` Erkek Gif'i Atar.`},
    {name:`> .woman-gif`,value:`Kadın Gif'i Atar`},
    {name:`> .marvel-gif`,value:`Kahraman Gif'i Atar`}
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
    name: "gif"
}