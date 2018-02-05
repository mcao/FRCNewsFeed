const Server = require('./server'),
  news = new Server(),
  Discord = require('discord.js'),
  bot = new Discord.Client(),
  config = require('./config.json'),
  fs = require('fs');
var reddit = require('./data/reddit.json')

news.on('chiefdelphi', (data) => {
  var cdEmbed = new Discord.RichEmbed()
    .setAuthor('New Post on Chief Delphi!', null, 'http://chiefdelphi.com')
    .setDescription(`[**${data.title}**](${data.link}) submitted by ${data.author}`)
    .setColor('#ff8800')
    .setFooter(data.category)
    .setTimestamp(new Date(data.date))
  bot.channels.get('370684908462538752').send({ embed: cdEmbed })
});

news.on('tba', (data) => {
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
});

news.on('frcblog', (data) => {
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
});

news.on('frcqa', (data) => {
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
});

news.on('twitch', (data) => {
  var twitche = new Discord.RichEmbed()
    .setAuthor(`Twitch`, 'https://d1qb2nb5cznatu.cloudfront.net/startups/i/114142-19c0993bf69c468f1350fd422bfad6b2-medium_jpg.jpg', `http://twitch.tv${data.channelName}`)
    .setDescription(`${data.channelName} just went live on Twitch!`)
    .setColor(6570405)
    .addField(`🎮 Game`, data.game, true)
    .addField('👁 Viewers', data.viewers, true)
    .setFooter(data.channelName)
    .setTimestamp(new Date(data.startedAt))
    .setImage(data.preview)
  
    bot.channels.get('370684908462538752').send({embed : twitche})
});

news.on('reddit', (data) => {
  var news = new Discord.RichEmbed()
    .setAuthor('New Post on /r/FRC!', null, 'https://reddit.com/r/FRC')
    .setDescription(`[**${data.title}**](${data.postURL}) submitted by ${data.author}`)
    .setColor('#cee3f8')
  if (data.imageURL)
    news.setImage(data.imageURL)
  bot.channels.get('370684908462538752').send({ embed: news })
});

news.on('yt', (data) => {
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
});

bot.on('ready', () => {
  console.log(`${bot.user.username} is online and ready!`)
})

bot.on('message', msg => {
  if (msg.content == '!invite') {
    msg.reply('<https://discordapp.com/api/oauth2/authorize?client_id=408392282178453505&permissions=67193857&scope=bot>');
  }
})

bot.login(config.token);