const Discord = require('discord.js')
const db = require('wio.db')
const ayarlar = require('../ayarlar.json');

module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  const msgArr = message.content.split(/\s+/g);
  const command = msgArr[0];
  const args = msgArr.slice(1);
  

  if (!command.startsWith(ayarlar.prefix)) return;

  let cmd = client.commands.get(command.slice(ayarlar.prefix.length));
  if (cmd) cmd.run(client, message, args,);
     
}
