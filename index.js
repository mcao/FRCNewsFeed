var Server = require('./server'),
  news = new Server(),
  Discord = require('discord.js'),
  bot = new Discord.Client(),
  config = require('./config.json');
  // https://discordapp.com/api/oauth2/authorize?client_id=408392282178453505&permissions=67193857&scope=bot

news.on('chiefdelphi', (data) => {
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
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
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
});

news.on('reddit', (data) => {
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
});

news.on('yt', (data) => {
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, "\t") + "```")
});

bot.on('ready', () => {
  console.log(`${bot.user.username} is online and ready!`)
})

bot.login(config.token);