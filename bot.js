const { Client } = require('discord.js');
const client = new Client();
const config = require('./config.json');

client.login(config.token);

client.on('ready', () => {
  console.log(`${client.user.tag} aktif.`);
  client.user.setPresence({
    status: "online",
    game: {
        name: `${config.owner} tarafından kodlandı.`,
        type: "STREAMING"
    }
  });
});

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix)) return;
      
    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(config.prefix.length).toLowerCase();

    if(cmd === 'yardim')
    {
        if (args[1]) return msg.reply('Geçersiz komut.');
        msg.channel.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: `Soru çözümünü açmak için -> !soru sorunumarasi saniye \n
            Klasik soru çözümünü açmak için -> !klasiksoru sorunumarasi saniye \n
            Bot hakkında bilgi almak için -> !bot`
        }});
    }

    if(cmd === 'bot')
    {
        if (args[1]) return msg.reply('Geçersiz komut.');
        msg.channel.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: `${config.owner} tarafından kodlanmıştır.`
        }});
    }

    if(cmd === 'soru')
    {
        if (!args[1]) return msg.reply('Geçersiz soru numarası girildi.');
        if (!args[2]) return msg.reply('Geçersiz süre girildi.');
        if (args[3]) return msg.reply('Geçersiz komut girildi.');
        if (isNaN(args[1])) return msg.reply('Geçersiz süre girildi.');
        if (isNaN(args[2])) return msg.reply('Geçersiz süre girildi.');

        const sorusayisi = args[1];
        const time = 1000 * args[2];

        msg.channel.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: sorusayisi + ". soruyu çözmek için " + time / 1000 + " saniyeniz var. \n Sorunun cevabını aşağıdan işaretleyiniz."
        }}).then(msg => {
            msg.react('🇦')
            msg.react('🇧')
            msg.react('🇨')
            msg.react('🇩')

            const filter = (reaction, user) => {
                return ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && user.bot === msg.author.id;
            };
            
            msg.awaitReactions(filter, { max: 1, time: time, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
                })
                setTimeout(function(){
                    msg.channel.send({embed: {
                        color: 3447003,
                        title: "Online Eğitim BOT",
                        description: sorusayisi + ". sorunun cevapları için süre doldu."
                    }});
                 }, time);
        });
    } 
    
    if(cmd === 'klasiksoru')
    {
        if (!args[1]) return msg.reply('Geçersiz soru numarası girildi.');
        if (!args[2]) return msg.reply('Geçersiz süre girildi.');
        if (args[3]) return msg.reply('Geçersiz komut girildi.');
        if (isNaN(args[1])) return msg.reply('Geçersiz süre girildi.');
        if (isNaN(args[2])) return msg.reply('Geçersiz süre girildi.');

        const sorusayisi = args[1];
        const time = 1000 * args[2];

        msg.channel.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: sorusayisi + ". soruyu çözmek için " + time / 1000 + " saniyeniz var. \n Sorunun cevabını aşağıya yazabilirsiniz."
        }}).then(msg => {            
            msg.awaitReactions(filter, { max: 1, time: time, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
                })
                setTimeout(function(){
                    msg.channel.send({embed: {
                        color: 3447003,
                        title: "Online Eğitim BOT",
                        description: sorusayisi + ". sorunun cevapları için süre doldu."
                    }});
                 }, time);
        });
    }  
});

client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.emoji.name === '🇦') {
        user.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: "Soruyu 🇦 olarak işaretledin."
        }});
    } else if (reaction.emoji.name === '🇧') {
        user.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: "Soruyu 🇧 olarak işaretledin."
        }});
    } else if (reaction.emoji.name === '🇨') {
        user.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: "Soruyu 🇨 olarak işaretledin."
        }});
    } else if (reaction.emoji.name === '🇩') {
        user.send({embed: {
            color: 3447003,
            title: "Online Eğitim BOT",
            description: "Soruyu 🇩 olarak işaretledin."
        }});
    } 
});