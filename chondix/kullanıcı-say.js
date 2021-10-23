const Discord = require('discord.js');
const db = require('wio.db');
const data = require('wio.db');

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
  }
  
exports.run = async (client, message, args) => {

const datas = await data.fetch(`erkekrol_${message.guild.id}`);
const datass = await data.fetch(`kızrol_${message.guild.id}`);
if(!datas) return message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oldu!').setDescription(`**${client.ayarlar.prefix}erkek-role @roleetiket** olarak erkek rolünü aktif etmelisin!`).setFooter('Erkek rolü aktif değil', message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png'))
if(!datass) return message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oldu!').setDescription(`**${client.ayarlar.prefix}kadın-role @roleetiket** olarak erkek rolünü aktif etmelisin!`).setFooter('Kadın rolü aktif değil', message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png'))

let images = [
'https://media.giphy.com/media/2kW2UcfY5fhXY3ybX5/giphy.gif',
'https://media.giphy.com/media/8vIEv5JZmO1RRU0Wmz/giphy.gif',
'https://media.giphy.com/media/l41lLPD1qV9jXpv56/giphy.gif',
'https://media.giphy.com/media/VGVxd48QjP1sdXi0Jx/giphy.gif',
'https://i.gifer.com/fxac.gif',
'https://media.giphy.com/media/l0HlAw20GtU0mbUeQ/giphy.gif',
'https://i.gifer.com/ASV.gif'
];

let toplamüye = message.guild.members.cache.size.toString().replace('0', '<a:sifir:788173265080287232>').replace('1', '<a:bir:788173293357105162>').replace('2', '<a:iki:788173354339139614>').replace('3', '<a:c_:788173364678098954>').replace('4', '<a:dort:788173425717674064>').replace('5', '<a:bes:788173440255393832>').replace('6', '<a:alti:788173447422410764>').replace('7', '<a:alti:788173447422410764>').replace('8', '<a:sekiz:788173454422835221>').replace('9', '<a:dokuz:788173455736569856>');
let aktifüye = message.guild.members.cache.filter(a => a.presence.status !== 'offline').size.toString().replace('0', '<a:sifir:788173265080287232>').replace('1', '<a:bir:788173293357105162>').replace('2', '<a:iki:788173354339139614>').replace('3', '<a:c_:788173364678098954>').replace('4', '<a:dort:788173425717674064>').replace('5', '<a:bes:788173440255393832>').replace('6', '<a:alti:788173447422410764>').replace('7', '<a:yedi:788173452317032458>').replace('8', '<a:sekiz:788173454422835221>').replace('9', '<a:dokuz:788173455736569856>');
let sesaktif = message.guild.members.cache.filter(a => a.voice.channel).size.toString().replace('0', '<a:sifir:788173265080287232>').replace('1', '<a:bir:788173293357105162>').replace('2', '<a:iki:788173354339139614>').replace('3', '<a:c_:788173364678098954>').replace('4', '<a:dort:788173425717674064>').replace('5', '<a:bes:788173440255393832>').replace('6', '<a:alti:788173447422410764>').replace('7', '<a:yedi:788173452317032458>').replace('8', '<a:sekiz:788173454422835221>').replace('9', '<a:dokuz:788173455736569856>');
let boost = message.guild.premiumSubscriptionCount.toString().replace('0', '<a:sifir:788173265080287232>').replace('1', '<a:bir:788173293357105162>').replace('2', '<a:iki:788173354339139614>').replace('3', '<a:c_:788173364678098954>').replace('4', '<a:dort:788173425717674064>').replace('5', '<a:bes:788173440255393832>').replace('6', '<a:alti:788173447422410764>').replace('7', '<a:yedi:788173452317032458>').replace('8', '<a:sekiz:788173454422835221>').replace('9', '<a:dokuz:788173455736569856>');
let kadınüyesayısı = message.guild.members.cache.filter(a => a.roles.cache.has(datass)).size.toString().replace('0', '<a:sifir:788173265080287232>').replace('1', '<a:bir:788173293357105162>').replace('2', '<a:iki:788173354339139614>').replace('3', '<a:c_:788173364678098954>').replace('4', '<a:dort:788173425717674064>').replace('5', '<a:bes:788173440255393832>').replace('6', '<a:alti:788173447422410764>').replace('7', '<a:yedi:788173452317032458>').replace('8', '<a:sekiz:788173454422835221>').replace('9', '<a:dokuz:788173455736569856>');
let erkeknüyesayısı = message.guild.members.cache.filter(a => a.roles.cache.has(datas)).size.toString().replace('0', '<a:sifir:788173265080287232>').replace('1', '<a:bir:788173293357105162>').replace('2', '<a:iki:788173354339139614>').replace('3', '<a:c_:788173364678098954>').replace('4', '<a:dort:788173425717674064>').replace('5', '<a:bes:788173440255393832>').replace('6', '<a:alti:788173447422410764>').replace('7', '<a:yedi:788173452317032458>').replace('8', '<a:sekiz:788173454422835221>').replace('9', '<a:dokuz:788173455736569856>');

let tag;
if(!data.fetch(`tag.${message.guild.id}`)) {
tag = '<a:0000:782322700752388108>';
} else {
tag = message.guild.members.cache.filter(a => a.user.username.includes(data.fetch(`tag.${message.guild.id}`))).size.toString().replace('0', '<a:sifir:788173265080287232>').replace('1', '<a:bir:788173293357105162>').replace('2', '<a:iki:788173354339139614>').replace('3', '<a:c_:788173364678098954>').replace('4', '<a:dort:788173425717674064>').replace('5', '<a:bes:788173440255393832>').replace('6', '<a:6666:787880334003404840>').replace('7', '<a:7777:787880348792913920>').replace('8', '<a:8888:787880352815120424>').replace('9', ':nine:');
}

message.channel.send(new Discord.MessageEmbed()
.setColor('#f6ff00')
.setAuthor(`Sunucu durumunu istedi: ${message.author.tag}`, message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png')
.setThumbnail(images.random())
.setDescription(`\`\`\`[.tag] ile taglı sayını ayarlayabilirsin.\`\`\`
**Toplam Üye** ${toplamüye}
**Aktif Üye** ${aktifüye}
**Seslide ki Üye Sayısı** ${sesaktif}
**Taglı Üye Sayısı** ${tag}
**Boost Sayısı** ${boost}
**Kadın Üye Sayısı** ${kadınüyesayısı}
**Erkek Üye Sayısı** ${erkeknüyesayısı}`));




};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'say'
};