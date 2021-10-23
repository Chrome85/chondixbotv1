const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');

exports.run = async (client, message, args) => {

  if(message.mentions.users.first()) message.author = message.mentions.users.first();

  const embed = new Discord.MessageEmbed()
  .setImage(message.author.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }))
  .setColor('GOLD');

  const button = new MessageButton()
  .setLabel('Avatar URL')
  .setStyle('url')
  .setURL(message.author.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }));


  return message.channel.send({ embed: embed, component: button });

};
exports.config = {
  aliases: []
};

exports.help = {
  name: 'avatar'
};