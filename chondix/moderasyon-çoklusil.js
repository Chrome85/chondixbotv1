const disbut = require("discord-buttons");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {


    function bulkDeletefunc(kaçyüzmesaj) {
        if (!kaçyüzmesaj) throw new TypeError("Vereceğiniz Mesaj Sayısı Belirtilmemiş!")
        let bölme = kaçyüzmesaj / 100
        if (bölme % 1 !== 0) throw new TypeError("Vereceğiniz Mesaj Sayısı 100 Ve Katları Olmalıdır!")
        for (let i = 0; i < bölme; i++) {
            message.channel.bulkDelete(100).catch(() => {}) //büyük ihtimal catche geldiyse ya missing perm hatası verecek ya da mesaj 14 gün önce atılmıştır ve silinemeyecek durumdadır bu yüzden konsol logu yazmadan boş bıraktım
        }
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor("❌ Yetersiz Yetki!")
            .setDescription("**Bu Komutu Kullanabilmek İçin `Mesajları Yönet` Yetkisine Sahip Olmalısın!**")
            .setColor("RED")
        );
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        const yetkimyokembed = new discord.MessageEmbed()
        .setAuthor("❌ Yetersiz Yetki!")
        .setDescription("**Bunu Yapabilmem İçin `Mesajları Yönet` Yetkisine Sahip Olmalıyım!**")
        .setColor("RED")
        return message.channel.send(yetkimyokembed)
    }
    var butttonsarr = []
    for (let i = 1; i < 11; i++) {
        const btn = new disbut.MessageMenuOption()
            .setLabel(i + "00")
            .setValue(i)
            .setEmoji("🗑️");
        butttonsarr.push(btn)
    }

    const menu = new disbut.MessageMenu()
        .addOptions(butttonsarr)
        .setMaxValues(1)
        .setMinValues(1)
        .setID("menu");

    const hakkında = new Discord.MessageEmbed()
        .setTitle("Çoklu sil")
        .setDescription(
            `>>> **Merhaba, aşağıdaki menüden kaç mesaj sileceğini seçebilirsin.**`
        );

    let msg = await message.channel.send({
        embed: hakkında,
        component: menu
    });

    const filter = menu => menu.clicker.user.id === message.author.id; //user filter (author only)
    const collector = message.createMenuCollector(filter, {
        time: 120000
    });
    client.on("clickMenu", menu => {
        if (menu.clicker.id !== message.author.id) return;
        menu.reply.defer();
        const valuget = menu.values[0]
        const toint = parseInt(valuget + "00")
        bulkDeletefunc(toint)


    });

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["çoklusil"],
    permLevel: 0
};

exports.help = {
    name: "çoklu-sil"
};