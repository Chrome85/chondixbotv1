const Discord = require("discord.js");
const moment = require("moment")
const ayarlar = require("./ayarlar.json")
const db = require("wio.db")
const jimp = require("jimp")
const client = new Discord.Client();
const express = require("express");
const app = express();
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const disbut = require('discord-buttons')
disbut(client)
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("Bot Başarıyla Uptime Ediliyor . . .");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________

client.commands = new Discord.Collection();

fs.readdir("./chondix/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./chondix/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});
//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag}! Aktif!`);
});
//BOT ÇALIŞTIRICI______________________________________________________________
client.login(ayarlar.token)

//////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`);
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli** ";
  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir** <a:okk:778774339259859002>";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [ 
             "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif", "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif", "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif", "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif", "https://cdn.discordapp.com/attachments/780550397693657129/781490237184016404/584b9b8561c106fd5ba81300e9fa47a7.gif", "https://cdn.discordapp.com/attachments/780550397693657129/781490231781359626/f7ee8cd4766ff13159ffd6383156b136.gif", "https://cdn.discordapp.com/attachments/780550397693657129/781490364119908382/85GW.gif", "https://cdn.discordapp.com/attachments/780550397693657129/781490683847901194/original.gif", "https://cdn.discordapp.com/attachments/780550397693657129/781490442490740746/tenor.gif", "https://cdn.discordapp.com/attachments/782364044988121128/783105243625947176/source.gif", "https://cdn.discordapp.com/attachments/782364044988121128/783105115057946654/cd3afdcabfec8c297e55793cfebf9f6d.gif"];

  ///////////////////
  //-------------------- Mod Log Sistemi --------------------//
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())
    c.send(embed)
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL())

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL())

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL())

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL())
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL())

    channel.send(embed)
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL())
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL())

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.cache.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL())

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.cache.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL()}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL())

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL())

    channel.send(embed)
})

//-------------------- Mod Log Sistemi --------------------//

  const embed = new Discord.MessageEmbed()
    .setColor("#f6ff00")
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.displayAvatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

 //
  .setDescription(`<a:an:778787681014120478> **Hoş geldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n <a:hype:778788019548454912> Kaydının yapılması için **isim** ve **yaş** yazman gerek. \n <a:dnya:778787223847829504> Hesap kuruluş tarihi: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}** \n <a:sarii:778774353343938570> Bu vatandaş: ${kontrol} \n <a:sasa:778787940741677088> <@&${kayıtçı}> rolündeki yetkililer sizinle ilgilenecektir.`);
  //
  client.channels.cache.get(kanal).send(embed);
  client.channels.cache.get(kanal).send(`||<@&${kayıtçı}>||`);
});
  
//kayıt kanal son //
////////////////// TAG ALMA /////////////////////
client.on('message', async (msg, member, guild) => {
  let tag2 = await  db.fetch(`tag.${msg.guild.id}`)
        if (msg.content.toLowerCase() === 'tag'){
          
        const tag = new Discord.MessageEmbed()
        .setColor('#f6ff00')
        .setDescription(`**İşte Tag :** ${tag2}`)
          msg.channel.send(tag).then(a=>a.delete({timeout:10000}));
      }
    });

const prefix = "."

client.on("message", async msg => {

  if(msg.content.startsWith(prefix)) return;

  const db = require("wio.db")

  var id = msg.author.id;

  var gid = msg.guild.id;

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`)

  const skanal = await db.fetch(`seviyekanal${msg.guild.id}`)

  let kanal = msg.guild.channels.cache.get(skanal)

  if (msg.author.bot === true) return;

  let seviyeEmbed = new Discord.MessageEmbed()

   seviyeEmbed.setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun! <a:tadaa:778787257057804369>`)

   seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`)

   seviyeEmbed.setColor("#f6ff00")

   if(!lvl) {

    db.set(`xp_${id}_${gid}`, 5);

    db.set(`lvl_${id}_${gid}`, 1);

    db.set(`xpToLvl_${id}_${gid}`, 100);

    db.set(`top_${id}`, 1)

    }

  

  let veri1 = [];

  

  if(seviyexp) veri1 = seviyexp

  if(!seviyexp) veri1 = 5

  

  if (msg.content.length > 7) {

    db.add(`xp_${id}_${gid}`, veri1)

  };

  let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`)

    let veri2 = [];

  

  if(seviyesınır) veri2 = seviyesınır

  if(!seviyesınır) veri2 = 250

   

  if (await db.fetch(`xp_${id}_${gid}`) > veri2) {

    if(skanal) {

 kanal.send(new Discord.MessageEmbed()

   .setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun <a:tadaa:778787257057804369>`)

   .setFooter(`${client.user.username} | Seviye Sistemi`)

   .setColor("#f6ff00"))

    }

    db.add(`lvl_${id}_${gid}`, 1)

    db.delete(`xp_${id}_${gid}`)};

    db.set(`top_${id}`, Math.floor(lvl+1))

  });

//SEVİYE-ROL-----------------------------------

client.on('message', async message => {

  var id = message.author.id;

  var gid = message.guild.id;

  let rrol = await db.fetch(`rrol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  

    if(rrol) {

  rrol.forEach(async rols => {

    var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`)

    if(Math.floor(rrol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(rrol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

  

    if(message.content == '.rütbeler') {

    if(!rrol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("#f6ff00")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      

      

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = rrol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`rrol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("#f6ff00")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

  

})

client.on('message', async message => {

   var id = message.author.id;

  var gid = message.guild.id;

  let srol = await db.fetch(`srol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  if(srol) {

  srol.forEach(async rols => {

    var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`)

    if(Math.floor(srol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(srol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

    if(message.content == '.seviyerolleri' || message.content == ".levelroles") {

    if(!srol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("#f6ff00")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = srol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`srol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("#f6ff00")

                      //.setColor(message.guild.member(message.author).highestRole.hexColor)

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

})

///////////////// SAHİBİM GELDİ AMK ///////////////////////////////
client.on("message", async msg => {
const request = require('node-superfetch');
const db = require("wio.db")
const ms = require('parse-ms')
let timeout = 600000//süresini dilediğiniz gibi kısaltabilirsiniz.
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = "477189482206986240"
          if (msg.author.id == i) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
  var embed = new Discord.MessageEmbed()
  .setThumbnail(msg.author.displayAvatarURL({dynamic : true}))
  .setDescription(`
  ╔════════════════════════════
  ║ <a:hawli:778787771049443338>
  ║  **Sahibim Burada Aç Yolu**! <@${msg.author.id}>
  ║ <a:hawli:778787771049443338>
  ╚════════════════════════════`)
  .setColor("#f6ff00")
   msg.channel.send(embed)
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});

///////////////////// SAHİBİM GELDİ AMK SON *****************************
client.on("message", msg => {
	const westrabumbe = new Discord.MessageEmbed()
    .setThumbnail(msg.author.displayAvatarURL({dynamic : true}))
    .setColor('#f6ff00')
    .setTitle("▬▬▬▬[<a:sasa:778787940741677088> Yardım Mesajım ]▬▬▬▬\n ")
    .addField("\n**Galiba Benden Yardım İstiyorsun ? O zaman Sana Yardım Edeyim.**\n","**\n`.yardım` Yazarak Benim `Tüm Komutlarımı Görebilirsin` ve Aşşağıdaki `Destek Sunucusuna Gelerek Botun Sahibinden Yardım Alabilirsin.`**")
    .addField("**➥ Link**", "[ Destek Sunucu](https://discord.gg/esXbPnr)")
    .setImage("https://cdn.discordapp.com/attachments/767544528537649193/782343766446964746/standard_2.gif")
    .setFooter(`${msg.author.username} Yardım Edebildiysem Çok Mutluyum.`, msg.author.avatarURL())
  if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
    msg.channel.send(westrabumbe);
  }
});

// İnvite Sistemi Beta //
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});



client.on("guildMemberAdd", async member => {
if(member.user.bot) return;
  member.guild.fetchInvites().then(async guildInvites => {
    let kanal = await db.fetch(`davetlog_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
    const daveteden = member.guild.members.cache.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let davetsayiv2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let davetsayi;
    if (!davetsayiv2) davetsayi = 0;
     else davetsayi = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

const davet = new Discord.MessageEmbed()
.setTitle('Aramıza Katıldı')
.setColor('#f6ff00')
.setDescription(`<a:sasa:778787940741677088> ${member} **Adlı Kullanıcı Sunucumuza Katıldı** \n**Onu Davet Eden Kişi** : ${daveteden}\n**${daveteden} Kişinin Toplam Davet Sayısı** : ${davetsayi}`)
client.channels.cache.get(kanal).send(davet)
  }
    
  );
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetlog_${member.guild.id}`);
  if (!kanal) return;
  let davetçi = await db.fetch(`bunudavet_${member.id}`);
  const daveteden = member.guild.members.cache.get(davetçi);
      let mesaj = db.fetch(`davetbbmesaj_${member.guild.id}`)
  db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  let davetsayi = await db.fetch(`davet_${davetçi}_${member.guild.id}`);
  
  if (!davetçi) {
    return client.channels.cache.get(kanal).send(`<a:sasa:778787940741677088> ${member} **Adlı Kullanıcı Aramızdan Ayarıldı Davet Eden Bulunamadı!**`);
  } else {
     
const davet = new Discord.MessageEmbed()
.setTitle('Aramızdan Ayrıldı')
.setColor('#f6ff00')
.setDescription(`<a:sasa:778787940741677088> ${member} Adlı Kullanıcı Sunucumuzdan Ayrıldı \n**Onu Davet Eden Kişi** : ${daveteden}\n**${daveteden} Kişinin Toplam Davet Sayısı** : ${davetsayi}`)
client.channels.cache.get(kanal).send(davet)  
      }
    }
);
// İnvite Sistemi Son //

//////////////////// SPAM ENGEL ///////////////////
// spam engel

const dctrat = require('wio.db'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await db.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
  const westraaaaam = new Discord.MessageEmbed()
  .setColor('#f6ff00')
  .setDescription(` <@${message.author.id}> , **Bu Sunucuda Spam Yapmana İzin Vermeyeceğim!**`)
  .setFooter(`Bu mesaj otomatik olarak silinecektir.`)
 if (!message.member.hasPermission("BAN_MEMBERS")) return ;
 message.channel.send(westraaaaam).then(msg => msg.delete({timeout: 5000}));
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500) // default : 500
}


});

////////////////// BAN KORUMA /////////////////////
client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor('#f6ff00')
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan atıldı!\nve yasaklanan kişinin yasağı kalktı!`
      );
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor('#f6ff00')
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan atıldı ve yasaklanan kişinin yasağı kalktı. `
      );
    client.channels.cache.get(kanal).send(embed);
  }
});
/////////////////// ANTİ RAİD ///////////////////
client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
  if (!kanal) return;  
  var cod = member.guild.owner
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let are = new Discord.MessageEmbed()
      .setColor('#f6ff00')
      .setThumbnail(member.user.avatarURL())
      .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **.bot-izni kaldır <BotID>**.`);
    cod.send(are);
     } else {
       let izinverilmemişbot = new Discord.MessageEmbed()
      .setColor('#f6ff00')
      .setThumbnail(member.user.avatarURL())
      .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot sunucuya eklendi ve Kickledim. Eğer izin vermek istiyorsanız ** **.bot-izni ver <BotID>**")//NWA

       member.kick();// Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
       cod.send(izinverilmemişbot)
       
       
       //----------------Self Bot Koruma------------------\\

client.on('message', message => {
    var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`)
    if(!antiraid) return;
    if(message.author.bot) return;
    message.guild.fetchMember(message.author).then(member => {
    if(member.hasPermission('BAN_MEMBERS')) return;
    var b = []
    var aut = []
    setTimeout(() => {
    message.channel.fetchMessages({ limit: 10 }).then(m => {
    m.forEach(a => {
    if(m.filter(v => v.content === a.content).size > m.size / 2) {
    message.guild.fetchMember(m.author).then(member2 => {
    if(member2.hasPermission('BAN_MEMBERS')) return;
    b.push(a)
    aut.push(a.author)
    })}})
    if(!b.includes(":warning: | `Self` Botlar Susturulacak.")) { işlem() }
    else {}

    function işlem() {

    if(b.length > 5) {
      message.channel.send(':warning: | `Self` Botlar Susturulacak.')
      aut.forEach(a => {
        message.channel.overwritePermissions(a, {
          "SEND_MESSAGES": false
        })
      })
      message.channel.send( ' | `Self` botlar susturuldu.')
    } else return;
    }
    })})})})

//----------------Self bot koruma son----------------\\
}
  }//NWA
});//NWA





/////////////////////// OTOROL /////////////////////////
client.on('guildMemberAdd', member => {
    let rol = db.fetch(`autoRole_${member.guild.id}`) 
    if(!rol) return;
    let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`) 
    if(!kanal) return;

 member.roles.add(member.guild.roles.cache.get(rol))
    let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({dynamic:true}))     
    .setDescription('>  <a:galp:778787614794186752> **<@' + member.user.id+  '>** **Adlı Kullanıcı Aramıza Katıldı** \n> **Kullanıcısına Başarıyla** <@&' + rol + '> **Rolü verildi**')
    .setColor('#f6ff00')    //.setFooter(`<@member.id>`)
    .setFooter('Chondixi Tercih Ettiğiniz İçin Teşekkür Ederiz.')
    member.guild.channels.cache.get(kanal).send(embed)

})
//////////////////////// OTOROL SON //////////////////////////

///////////////////////// SAYAÇ ////////////////////
//-----------------------Sayaç-----------------------\\


client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9)
  if (!skanal31) return;
  const geldi = new Discord.MessageEmbed()
.setColor('#f6ff00')
.setThumbnail(member.user.displayAvatarURL({dynamic : true}))
.addField( `***╭−−−−−−−−−−− \`『 °Chondix Sayaç° 』\` −−−−−−−−−−−−╮ ***`,
    `
**┊**  **${member}** Sunucuya Katıldı
**┊**  **${sayac}** Kişi Olmamıza **${sayac - member.guild.memberCount}** Kişi Kaldı
**┊**  Toplam **${member.guild.memberCount}** Kişiyiz !
**╰−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−╯**
  `)
  skanal31.send(geldi)
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9)
  if (!skanal31) return;
const gitti = new Discord.MessageEmbed()
.setColor('#f6ff00')
.setThumbnail(member.user.displayAvatarURL({dynamic : true}))
.addField( `***╭−−−−−−−−−−− \`『 °Chondix Sayaç° 』\` −−−−−−−−−−−−╮ ***`,
    `
**┊**  **${member}** Sunucudan Ayrıldı
**┊**  **${sayac}** Kişi Olmamıza **${sayac - member.guild.memberCount}** Kişi Kaldı
**┊**  Toplam **${member.guild.memberCount}** Kişiyiz !
**╰−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−╯**
   `)
  skanal31.send(gitti)
});

//-----------------------Sayaç Son-----------------------\\

//------------------OTOTAG SİSTEMİ--------------------\\

client.on("guildMemberAdd", async member => {
let frenzy_ibrahim = await db.fetch(`Frenzy?Code?Ototag_${member.guild.id}`) 
let frenzykanal = await db.fetch(`Frenzy?Code?OtotagKanal_${member.guild.id}`)
if(!frenzy_ibrahim || !frenzykanal) return
  
  var embed2 = new Discord.MessageEmbed()
  .setThumbnail(member.user.displayAvatarURL({dynamic : true}))
    .setColor("#f6ff00")
    .setAuthor("Ototag Sistemi")
    .setDescription(
      `**${member.user.username}** Adlı Kullanıcıya Başarıyla **${frenzy_ibrahim}** Tagı'nı Verdim `
          );
      
 
 member.setNickname(`${frenzy_ibrahim} ${member.user.username}`)
client.channels.cache.get(frenzykanal).send(embed2)
 
});


//------------OTOTAG SİSTEMİ SON-----------------\\
client.on("guildMemberAdd", async member => {
  let user = member.guild.members.cache.get(member.id);

  let kanal = await db.fetch(`güvenlik_${member.guild.id}`);
  if (!kanal) return; 
 
  const embed = new Discord.MessageEmbed()
        .setDescription(`${member} **Sunucuya Katıldı!** \n**Güvenlik İçin Hesabına Gerekli Rolü Verdim.**`)
        .setColor('#f6ff00');
      client.channels.cache.get(kanal).send(embed);
      let rol1 = await db.fetch(`güvenlikalınacak_${member.guild.id}`);
      let rol2 = await db.fetch(`güvenlikverilecek_${member.guild.id}`);
      if (!rol1) {
        if (!rol2) {
          return;
        } else {
          member.roles.add(rol2);
          return;
        }
      } else {
        member.roles.remove(rol1);
        if (!rol2) {
          return;
        } else {
          member.roles.add(rol2);
          return;
        }
      }
      {
      const embed = new Discord.MessageEmbed()
      .setThumbnail(user.author.displayAvatarURL({dynamic : true}))
      .setColor('#f6ff00')
      .setDescription(`${member} **Sunucuya Katıldı!** \n**Güvenlik İçin Hesabına Gerekli Rolü Verdim.**`)
      client.channels.cache.get(kanal).send(embed);
      let rol1 = await db.fetch(`güvenlikfake_${member.guild.id}`);
      if (!rol1) return;
      else {
        member.roles.add(rol1);
      }
    }
  }
)

////////////////////////// EKLENDİM ATILDIM ////////////////////
client.on("guildCreate", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "477189482206986240";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildid = guild.id
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.setTitle(`Yeni Sunucu!`)
embed.addField("Sunucu adı", guildName)
embed.addField("Sunucu ID", guildid)
embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField("Sunucu sahibi", guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
embed.setColor("#f6ff00")

embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)

})

client.on("guildDelete", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "477189482206986240";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildid = guild.id
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.setTitle("Sunucudan Attılar Piçler")
embed.addField("Sunucu adı", guildName)
embed.addField("Sunucu ID", guildid)
embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField("Sunucu sahibi", guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
  embed.setColor("#f6ff00")
embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)
});

////reklam-engel

const reklam = [
  ".com",
  ".net",
  ".xyz",
  ".tk",
  ".pw",
  ".io",
  ".me",
  ".gg",
  "www.",
  "https",
  "http",
  ".gl",
  ".org",
  ".com.tr",
  ".biz",
  "net",
  ".rf",
  ".gd",
  ".az",
  ".party",
".gf"
];
client.on("messageUpdate", async (old, nev) => {

if (old.content != nev.content) {
let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
if (i) {

if (reklam.some(word => nev.content.includes(word))) {
if (nev.member.hasPermission("BAN_MEMBERS")) return ;
 //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
const embed = new Discord.MessageEmbed() .setColor('#f6ff00') .setDescription(` ${nev.author} , **Mesajını editleyerek reklam yapmaya çalıştı!**`)
      .addField("Mesajı:",nev)
  
      nev.delete();
      const embeds = new Discord.MessageEmbed() .setColor('#f6ff00') .setDescription(` ${nev.author} , **Mesajı editleyerek reklam yapamana izin veremem!**`) 
    client.channels.cache.get(y).send(embed)
      nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
    
}
} else {
}
if (!i) return;
}
});

client.on("message", async msg => {


if(msg.author.bot) return;
if(msg.channel.type === "dm") return;
   let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);

let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
    if (i) {
        if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
          try {
           if (!msg.member.hasPermission("MANAGE_GUILD")) {
           //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
msg.delete({timeout:750});
              const embeds = new Discord.MessageEmbed() .setColor('#f6ff00') .setDescription(` <@${msg.author.id}> , **Bu sunucuda reklam yapmak yasak!**`)
msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                     db.add(`reklam_${msg.guild.id}_${msg.author.id}`, 1)

          const embed = new Discord.MessageEmbed() .setColor('#f6ff00') .setDescription(` ${msg.author} , **Reklam yapmaya çalıştı!**`) .addField("Mesajı:",msg)
         client.channels.cache.get(y).send(embed)
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
   if(!i) return ;
});


//reklam engel son //

//-----------------------Reklam Engel Son-----------------------\\
client.on("message", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  const kufur = [
    "mk",
    "göt",
    "meme",
    "pipi",
    "am",
    "taşşak",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "yavşak",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "oç",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "kahpe",  
    "kahbe", 
    "siktir git"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com"
  ];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor("#f6ff00")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            `Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(a=>a.delete({timeout:10000}));

        return;
      }
    }
  }
  
  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor("#f6ff00")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim! `
          );
        db.add(`küfür_${msg.guild.id}_${msg.author.id}`, 1)
        msg.channel.send(k).then(a=>a.delete({timeout:10000}));
    
      }
    }
  }
});

//-------------------KÜFÜR ENGEL SON-----------------------\\

//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa'){
          
        const sa = new Discord.MessageEmbed()
        .setColor('#f6ff00')
        .setFooter(`${msg.author.tag} Selam Verdi.`, msg.author.avatarURL())
        .addField('Aleykum Selam Hoşgeldin İyi misin ?','İnşallah İyisindir.')
          msg.channel.send(sa).then(a=>a.delete({timeout:10000}));
      }
      }
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'hi'){
          
        msg.reply('**Hi welcome**').then(a=>a.delete({timeout:10000})); 
      }
      }
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sea'){
          
        const sea = new Discord.MessageEmbed()
        .setColor('#f6ff00')
        .setFooter(`${msg.author.tag} Selam Verdi.`, msg.author.avatarURL())
        .addField('Aleykum Selam Hoşgeldin İyi misin ?','İnşallah İyisindir.')
          msg.channel.send(sea).then(a=>a.delete({timeout:10000})); 
      }
      }
    });
client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'iyiyim'){
          
        const iyilik = new Discord.MessageEmbed()
        .setColor('#f6ff00')
        .setFooter(`${msg.author.tag} İyi Olmana Sevindim.`, msg.author.avatarURL())
        .addField('Ohhh Ne Güzel!','Allah Dahada İyilik Versin.')
          msg.channel.send(iyilik).then(a=>a.delete({timeout:10000}));  
      }
      }
    });
client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'kötüyüm'){
          
        const kötülük = new Discord.MessageEmbed()
        .setColor('#f6ff00')
        .setFooter(`${msg.author.tag} Kötü Olmana Üzüldüm.`, msg.author.avatarURL())
        .addField('Senin Adına Üzüldüm.','Allah İyilik Versin Patron. Seviliyorsun Unutma')
          msg.channel.send(kötülük).then(a=>a.delete({timeout:10000}));  
      }
      }
    });



//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\


///////////////////////OtoCevap Bitiş////////////////////////////

  
//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//


client.on('message', async message => {
if(message.channel.type !== 'text') return;
if(message.author.bot) return;
if(message.content.startsWith('.afk')) return;
if(message.mentions.members.first()) {
let mention = message.mentions.members.first();
const est = await db.fetch(`kullanıcı.${mention.id}.${message.guild.id}`);
if(est) {
message.channel.send(new Discord.MessageEmbed().setThumbnail(mention.user.avatarURL() ? mention.user.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png')
.setTitle('Etiketlediğin Kullanıcı AFK').setColor('#f6ff00').setDescription(` \n**• __Sebep;__ \`${est}\`**`));
}
}
const stat = await db.fetch(`name.${message.author.id}.${message.guild.id}`);
if(stat) {
message.member.setNickname(stat);
db.delete(`kullanıcı.${message.author.id}.${message.guild.id}`);
db.delete(`name.${message.author.id}.${message.guild.id}`);
message.channel.send(new Discord.MessageEmbed().setColor('#f6ff00').setDescription(`${message.author} **Cihaz üzerine tekrardan hoş geldin!**`));
}
})


//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//
  

//////////////// ROL KORUMA ////////////////////
client.on("roleDelete", async role => {
  let rolko = await db.fetch(`rolk_${role.guild.id}`);
  if (rolko) { 
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Roller Tekrar Açıldı.'})
  }
})

//

client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk) { 
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.delete()
}
})
client.on('guildDelete', guild => {

  let avex = new Discord.MessageEmbed()

  .setColor("RED")
  .setTitle(" Bot Atıldı ")
  .addField("Sunucu Adı:", guild.name)
  .addField("Sunucu sahibi", guild.owner)
  .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
  .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
  .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

     client.channels.cache.get('881928267140059136').send(avex);

     });


     client.on('guildCreate', guild => {

     let avex = new Discord.MessageEmbed()

     .setColor("GREEN")
     .setTitle(" Bot Eklendi ")
     .addField("Sunucu Adı:", guild.name)
     .addField("Sunucu sahibi", guild.owner)
     .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
     .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
     .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

        client.channels.cache.get('881928267140059136').send(avex);

        });



client.on("message", (message) => {
  // main klasörüne atılacaktır.
  if (message.content.toLowerCase().startsWith(prefix + "roliste")) {
    //ne yazınca bunları atsın (akinatör kodu gibi xd) PREFİXİNİZLE!!
    let firstOption = new disbut.MessageMenuOption()
      .setValue("first")
      .setDescription("Chondix Bildirim Rolünü Alırsınız")
      .setLabel("Chondix Bildirim");
    let menu = new disbut.MessageMenu()
      .setPlaceholder("Seçeneğe tıkla ve istediğin rolleri al!") // stringi değişebilirsiniz seçim yapılmamışken gözüken yazıdır.
      .setID("menu")
      .addOptions(firstOption) //seçenek eklediğinizde buraya ekleyin
      .setMinValues(0)
      .setMaxValues(1);
    // bu embeddir boş mesaj göndermemek için yaptım ama siz buraya embed yazmayıp yazı da yazabilirsiniz.
    let embed = new Discord.MessageEmbed().setDescription("İşte menü");
    // embedi silecekseniz yazı ile gönderecekseniz message.channel.send(`mesajınız`, {component: menu}) yapmanız lazım.
    message.channel.send({
      embed: embed,
      component: menu,
    });
    // event kısmıdır
    client.on("clickMenu", async (menu) => {
      if (menu.clicker.id !== message.author.id) return;
      await menu.clicker.fetch();
      await menu.reply.think(true);
      if (menu.values[0] === "first") {
        if (menu.clicker.member.roles.cache.has("899657723300417616")) {
          // rol var mı diye kontrol ediyor
          menu.clicker.member.roles.remove("899657723300417616"); //varsa rolü geri alıyor
        } else {
          menu.clicker.member.roles.add("899657723300417616"); // yoksa rolü veriyor
        }
        menu.reply.edit("Rollerin düzenlendi."); // seçim bittikten sonra atılan mesaj bütün mesajların aynı olmasına özen gösterin karışıklık olmasın.
      }
    });
  }
});


//coin
const quick = require('quick.db')
client.on("message", async(message) => {
  if (message.author.bot) return;
 if (!message.guild) return;
 const ayarfetch = quick.fetch(`coinsistem_${message.guild.id}`)
 if(ayarfetch == true) {
   if(message.content.length > 20) {
    quick.add(`coin_${message.author.id}_${message.guild.id}`, 2)
   }
   const fetch = quick.fetch(`coin_${message.author.id}_${message.guild.id}`)
   const objfetch = quick.fetch(`objcoin_${message.guild.id}`)
   if(objfetch !== null) {
    var res = objfetch.filter(obj => {
      return fetch >= obj.kacCoinLazim
     })
     if(res.length > 0) {
       try{
         for (let index = 0; index < res.length; index++) {
       await message.member.roles.add(res[index].rolID)            
         }
       } catch(e) {
         console.log(e)
       }
     }
   }
 }
})

//-------------------- Mod Log Sistemi --------------------//

client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())
    c.send(embed)
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL())

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL())

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL())

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL())
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL())

    channel.send(embed)
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL())
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL())

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.cache.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL())

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.cache.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL()}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL())

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL())

    channel.send(embed)
})

//-------------------- Mod Log Sistemi --------------------//
