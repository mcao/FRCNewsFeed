var Server = require('./server'),
  news = new Server(),
  Discord = require('discord.js'),
  bot = new Discord.Client();

news.on('chiefdelphi', (data) => {
  console.log(data);
});

news.on('tba', (data) => {
  console.log(data);
});