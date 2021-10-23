const Discord = require('discord.js');
const db = require('wio.db');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');

exports.run = async (client, message, args) => {
    let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.com/invite/SANuqz8vNq) gelebilirsin!`)
  if(karaliste) 
    return message.channel.send(westraben)
  
  
  this.fighting = new Set();
	let opponent = message.mentions.users.first()
	if (!opponent) return message.reply("\`Oynamak istediğin kişiyi etiketlemelisin!\`")
  
  if (opponent.bot) return message.reply(' **Botlar ile oynayamazsın!**');
  if (opponent.id === message.author.id) return message.reply(' **Kendin ile düello atamazsın!**');
		if (this.fighting.has(message.channel.id)) return message.reply(' **Kanal başına sadece bir düello meydana gelebilir.**');
		this.fighting.add(message.channel.id);
		try {
			if (!opponent.bot) {
              const istek = new Discord.MessageEmbed()
              .setColor('#f6ff00')
              .setTitle('Düello İsteği')
              .addField(`Düello İsteğini Kabul Ediyor musun ?`,`${opponent} **Evet** Yada **Hayır** Olarak Cevapla.`)
              message.channel.send(istek)
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.channel.send(`**${opponent} Düelleoyu Kabul Etmedi!**`);
				}
			}
			let userHP = 500;
			let oppoHP = 500;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			};
			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			};
			while (userHP > 0 && oppoHP > 0) { // eslint-disable-line no-unmodified-loop-condition
				const user = userTurn ? message.author : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
					const komut = new Discord.MessageEmbed()
          .setColor('#f6ff00')
          .setTitle('Sıra Sende')
          .addField(`\`${user.username}\` Napıcaksın ? \`saldır\`, \`savun\`, \`ultra güç\`, veya \`kaç\``,`\n<@${message.author.id}> : ${userHP}  <a:galp:778787614794186752> \n ${opponent} : ${oppoHP}  <a:galp:778787614794186752>`)
					.setFooter('İyi Eğlenceler...')
          message.channel.send(komut)
                        .then(a=>a.delete({timeout:20000}));
					const filter = res =>
						res.author.id === user.id && ['saldır', 'savun', 'ultra güç', 'kaç'].includes(res.content.toLowerCase());
					const turn = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						await message.reply(`Üzgünüm ama, süre doldu!`);
						reset();
						continue;
					}
					choice = turn.first().content.toLowerCase();
				} else {
					const choices = ['saldır', 'savun', 'ultra güç'];
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'saldır') {
					const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
					const saldır = new Discord.MessageEmbed()
          .setColor('#f6ff00')
          .setTitle('Saldırı Yaptı')
          .addField(`\`${user.username}\` Sana \`${damage}\` Gücünde Vurdu!`,`*Bu Acımış Olmalı*`)
          message.channel.send(saldır)
              .then(a=>a.delete({timeout:5000}));
          
					dealDamage(damage);
					reset();
				} else if (choice === 'savun') {
					const savun = new Discord.MessageEmbed()
          .setColor('#f6ff00')
          .setTitle('Kendini Savundu')
          .addField(`\`${user.username}\`Kendini Kalkan İle Savundu`,`*Korunmak Önemli*`)
          message.channel.send(savun)
                        .then(a=>a.delete({timeout:5000}));
					guard = true;
					reset(false);
				} else if (choice === 'ultra güç') {
					const miss = Math.floor(Math.random() * 4);
					if (!miss) {
						const damage = randomRange(100, guard ? 150 : 300);
					const ultragüçtm = new Discord.MessageEmbed()
            .setColor('#f6ff00')
          .setTitle('Ultra Güç Ortaya Çıktı?')
          .addField(`\`${user.username}\` Ultra Gücünü Kullandı Ve Rakibine \`${damage}\` Vurdu`,`*Affetmiyor*`)
          message.channel.send(ultragüçtm)
                          .then(a=>a.delete({timeout:5000}));
						dealDamage(damage);
					} else {
											const ultragüçno = new Discord.MessageEmbed()
            .setColor('#f6ff00')
          .setTitle('Ultra Güç Ortaya Çıktı?')
          .addField(`\`${user.username}\` Ultra Gücünü Kullanamayıp Ağlıyor.`,`*Üzgün*`)
          message.channel.send(ultragüçno)
                          .then(a=>a.delete({timeout:5000}));
					}
					reset();
				} else if (choice === 'kaç') {
					const kaç = new Discord.MessageEmbed()
                      .setColor('#f6ff00')
          .setTitle('Korktu Galiba?')
          .addField(`\`${user.username}\` Korkup Kaçtı`,`Korkak Tavuk`)
          message.channel.send(kaç)
                                    .then(a=>a.delete({timeout:10000}));
					forfeit();
					break;
				} else {
					await message.reply('Ne yapmak istediğini anlamadım.');
				}
			}
			this.fighting.delete(message.channel.id);
            const winner = userHP > oppoHP ? message.author : opponent;
const bitti = new Discord.MessageEmbed()
                      .setColor('#f6ff00')
   .setTitle('Oyun Bitti')
   .addField(`\`${winner.username}\` Bileğinin Hakkıyla Oyunu Kazandı.`,`**Son Durum ;** \n<@${message.author.id}> : **${userHP}**  <a:galp:778787614794186752> \n${opponent}: **${oppoHP}**  <a:galp:778787614794186752>`)
message.channel.send(bitti)   
                                          .then(a=>a.delete({timeout:10000}));

} catch (err) {
			this.fighting.delete(message.channel.id);
			throw err;
		}
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['1vs1', '1v1', 'savaş'],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: 'düello',
  category: "eğlence",
  description: 'İstediğiniz bir kişi ile düello atarsınız!',
  usage: 'düello <@kullanıcı>'
};