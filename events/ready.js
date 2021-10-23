const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;
  
module.exports = client => {
var oyun = [
        `🌐 ${prefix}yardım `,
        `📢 ${prefix}nsfw | Sistemi Gelmiştir!`,
        `💡 ${prefix}botdavet | Beni ekleyin`,
        `👨 ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı!`,
        `🌍 ${client.guilds.cache.size} Sunucuda Hizmet!`,
        `📢 ${prefix}tavsiye | ${prefix}bug-bildir`   
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "https://www.twitch.tv/");
        }, 2 * 20000);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] -----Chondix Developers------`);
  client.user.setStatus("idle");
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
};