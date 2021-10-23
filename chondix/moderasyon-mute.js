const Discord = require('discord.js')
const data = require('wio.db');
const ms = require('ms')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
const logChannel = await data.fetch(`mute.log.${message.guild.id}`);
        const muteYetkili = await data.fetch(`muteyetki.role.${message.guild.id}`);
        let prefix = ayarlar.prefix;
        if(!logChannel) return;
        if(!muteYetkili) return;
        
        const errorEmbed = new Discord.MessageEmbed()
        .setColor('RED');
        const errorEmbed2 = new Discord.MessageEmbed()
        .setTitle('Bir hata oldu! ');
        
        if(!message.member.permissions.has(muteYetkili)) return message.channel.send(errorEmbed
            .setTitle(`Bir hata oldu! `)
            .setColor("RED")
            .setDescription(`${message.guild.roles.cache.get(muteYetkili)} | Rolüne sahip olman gerekiyor.`));
        
            
        
            if(!args[0]) return message.channel.send(errorEmbed
                .setTitle('Bir hata oldu! ')
                .setDescription(`Kullanıcı etiketleyerek dener misin?
        **Örnek olarak**:
        \`\`\`${prefix}mute @üyeetiketi 1m merhaba
        ${prefix}mute 686185592899633200 1m merhaba\`\`\``));
        
        let member;
        
        if(message.mentions.members.first()) {
        member = message.mentions.members.first();
        } else if(args[0]) {
       
            member = message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send(errorEmbed
            .setTitle('Bir hata oldu! ')
            .setDescription(`Kullanıcı etiketleyerek dener misin?
        **Örnek olarak**:
        \`\`\`${prefix}mute @üyeetiketi 1m merhaba
        ${prefix}mute 686185592899633200 1m merhaba\`\`\``));
        }
        
        if(message.author.id === member.id) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#9c5cb2')
        .setTitle('Agaa beeeeeeeee!')
        .setDescription(`O kadar yürekli olamazsın.. 🙄`))
        
        if(member.permissions.has('ADMINISTRATOR')) return message.channel.send(errorEmbed2
            .setColor("RED")
            .setTitle(`Bir hata oldu! `)
            .setThumbnail(message.author.avatarURL({dynamic:true}))
            .setDescription('Yönetici bir kullanıcıya karışamam!'));
            
        
        if(!args[1]) return message.channel.send(errorEmbed
            .setTitle('Bir hata oldu! ')
        .setDescription(`${message.author} **Süre** Belirtmeyi unutma lütfen! \`1s & 1m & 1h & 1d\` kullanarak dener misin?
        **Örnek olarak**:
        \`\`\`${prefix}mute @üyetiketi 1m merhaba\`\`\``));
        
        let cooldown = ms(args[1]);
        let reason;
        if(args[2]) reason = args[2];
        if(!args[2]) reason = 'Bir açıklama yok.';
        
        message.guild.channels.cache.filter(a => a.type === 'text').forEach(s => {
        s.overwritePermissions([{ id: member.id, deny: ['SEND_MESSAGES'] }]);
        });
        
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`
         ${member} **kullanıcısı için mute verildi.**
         **Açıklama:** \`${reason}\`
         **Ceza Süre:** \`${args[1]}\``));
        
        message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed()
        .setColor('#00001')
        .setTitle('Chondix - Chat Mute Sistem')
        .setDescription(`
         **Kullanan Yetkili:** \`${message.author.tag}\`
         **Kullanılan kişi:** \`${member.user.tag}\`
         **Açıklama:** \`${reason}\`
         **Ceza Süre:** \`${args[1]}\``)
        .setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png'));

        
        setTimeout(() => {
        
        message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed()
        .setTitle('Rakers - Chat Mute Sistem')
        .setDescription(`
         ${member.user} **kullanıcısının chat mute süresi bitti!**
        `))
        
        message.guild.channels.cache.filter(a => a.type === 'text').forEach(s => {
        s.overwritePermissions([{ id: member.id, null: ['SEND_MESSAGES'] }]);
        });
        }, cooldown);
         

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["muteat"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'mute',
  };