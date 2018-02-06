const Server = require('./server'),
  news = new Server(),
  Discord = require('discord.js'),
  bot = new Discord.Client(),
  config = require('./config.json'),
  fs = require('fs'),
  types = ['chiefdelphi', 'tba', 'frcblog', 'frcqa', 'twitch', 'reddit', 'yt'];

news.on('chiefdelphi', (data) => {
  var cdEmbed = new Discord.RichEmbed()
    .setAuthor('New Post on Chief Delphi!', null, 'http://chiefdelphi.com')
    .setDescription(`[**${data.title}**](${data.link}) submitted by ${data.author}`)
    .setColor('#ff8800')
    .setFooter(data.category)
    .setTimestamp(new Date(data.date))
  try {
    var cdChannels = require('./data/chiefdelphi.json');
    for (var i = 0; i < cdChannels.length; i++) {
      if (cdChannels[i].type == 'discord') {
        bot.channels.get(cdChannels[i].channel).send({ embed: cdEmbed })
      }
    }
    console.log('Sent Chief Delphi News to ' + cdChannels.length + ' channels!');
  } catch (err) {
    console.log('Error with Chief Delphi News:\n' + err.stack);
  }
});

news.on('tba', (data) => {
  // Work on different types and making each specific
  bot.channels.get('370684908462538752').send("```" + JSON.stringify(data, null, '\t') + "```")
});

news.on('frcblog', (data) => {
  var news = new Discord.RichEmbed()
    .setAuthor('New FRC Blog Post!', null, data.link)
    .setDescription(`[**${data.title}**](${data.link}) by ${data.author}`)
    .setColor('#00A0E2')
    .setTimestamp(new Date(data.date))

  try {
    var blogChannels = require('./data/frcblog.json');
    for (var i = 0; i < blogChannels.length; i++) {
      if (blogChannels[i].type == 'discord') {
        bot.channels.get(blogChannels[i].channel).send({ embed: news })
      }
    }
    console.log('Sent FRC Blog to ' + blogChannels.length + ' channels!');
  } catch (err) {
    console.log('Error with FRC Blog:\n' + err.stack);
  }
});

news.on('frcqa', (data) => {
  var news = new Discord.RichEmbed()
    .setAuthor('New FRC Q&A Answer!', null, data.link)
    .setDescription(`[**${data.title}**](${data.link})`)
    .setColor('#00A0E2')
    .setTimestamp(new Date(data.date))

  try {
    var qaChannels = require('./data/frcqa.json');
    for (var i = 0; i < qaChannels.length; i++) {
      if (qaChannels[i].type == 'discord') {
        bot.channels.get(qaChannels[i].channel).send({ embed: news })
      }
    }
    console.log('Sent FRC Q&A to ' + qaChannels.length + ' channels!');
  } catch (err) {
    console.log('Error with FRC Q&A:\n' + err.stack);
  }
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
    .setImage(data.preview);

  try {
    var twitchChannels = require('./data/twitch.json');
    for (var i = 0; i < twitchChannels.length; i++) {
      if (twitchChannels[i].type == 'discord') {
        bot.channels.get(twitchChannels[i].channel).send({ embed: twitche })
      }
    }
    console.log('Sent Twitch Notifs to ' + twitchChannels.length + ' channels!');
  } catch (err) {
    console.log('Error with Twitch Notifs:\n' + err.stack);
  }
});

news.on('reddit', (data) => {
  var news = new Discord.RichEmbed()
    .setAuthor('New Post on /r/FRC!', null, 'https://reddit.com/r/FRC')
    .setDescription(`[**${data.title}**](${data.postURL}) submitted by ${data.author}`)
    .setColor('#cee3f8')
  if (data.imageURL != "http://ifttt.com/images/no_image_card.png")
    news.setImage(data.imageURL)
  try {
    var redditChannels = require('./data/reddit.json');
    for (var i = 0; i < redditChannels.length; i++) {
      if (redditChannels[i].type == 'discord') {
        bot.channels.get(redditChannels[i].channel).send({ embed: news })
      }
    }
    console.log('Sent Reddit News to ' + redditChannels.length + ' channels!');
  } catch (err) {
    console.log('Error with Reddit News:\n' + err.stack);
  }
});

news.on('yt', (data) => {
  var yt = new Discord.RichEmbed()
    .setAuthor(`New Video on ${data.channel}`, null, data.url)
    .setDescription(`[${data.name}](${data.url}) (${data.duration})`)
    .setColor('#ff0000')
    .setFooter(data.channel)
    .setTimestamp(new Date(data.date))
    .setImage(data.thumbnail)

  try {
    var ytChannels = require('./data/yt.json');
    for (var i = 0; i < ytChannels.length; i++) {
      if (ytChannels[i].type == 'discord') {
        bot.channels.get(ytChannels[i].channel).send({ embed: yt })
      }
    }
    console.log('Sent YT to ' + ytChannels.length + ' channels!');
  } catch (err) {
    console.log('Error with YT:\n' + err.stack);
  }
});


bot.on('message', msg => {
  if (msg.content == '!invite') {
    msg.reply('<https://discordapp.com/api/oauth2/authorize?client_id=408392282178453505&permissions=67193857&scope=bot>');
  } else if (msg.content.startsWith('!subscribe')) {
    var args = msg.content.split(' ').splice(1);
    if (args[0].toLowerCase() == 'all') {

    } else {
      var subscribed = '';
      var subscribedCount = 0;
      var alreadySubscribed = '';
      var alreadySubscribedCount = 0;
      var notFoundCount = 0;
      var subs = [];

      if (msg.content.indexOf(',') > -1) {
        subs = msg.content.split(',');
      } else if (msg.content !== null) {
        subs[0] = msg.content;
      } else {
        return msg.channel.send('Please specify something you would like to subscribe to!');
      }

      console.log(subs);

      for (var i = 0; i < subs.length; i++) {
        var found = false;
        subs[i] = subs[i].trim();
        for (var j = 0; j < types.length; j++) {
          if (types[j].toLowerCase() === subs[i].toLowerCase()) {
            console.log('Found ' + subs[i]);
            found = true;
            try {
              found = false;
              var sub = require(`./data/${subs[i]}.json`)
              for (var k = 0; k < sub.length; k++) {
                if (sub[k].id == msg.channel.id) {
                  alreadySubscribedCount++;
                  alreadySubscribed += subs[i] + '\n'
                  found = true;
                }
              }
              if (!found) {
                subscribed += subs[i] + '\n'
                subscribedCount++;
              }
            } catch (err) {
              msg.channel.send('An error has occurred:\n' + err.stack)
            }
          }
        }
        if (!found) {
          console.log('Could not find ' + subs[i].trim());
          notFoundCount++;
        }
      }

      var subEmbed = new Discord.RichEmbed()
        .setFooter(bot.user.username)
        .setTimestamp()
        .setColor(msg.guild.me.displayColor);
      if (subscribedCount > 0) {
        subEmbed.addField(`Successfully subscribed to ${subscribedCount} source(s)!`, subscribed);
      }
      if (alreadySubscribedCount > 0) {
        subEmbed.addField(`You were already subscribed to ${alreadySubscribedCount} source(s)!`, alreadySubscribed);
      }
      if (notFoundCount > 0) {
        subEmbed.addField(`Couldn't find ${notFoundCount} source(s)!`, 'Try !help to get a list of valid sources!');
      }

      msg.channel.send({ embed: subEmbed });
    }
  } else if (msg.content == '!help') {
    var help = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setColor(msg.guild.me.displayHexColor)
      .setDescription('Command Overview')
      .setFooter(bot.user.username)
      .setTimestamp()
      .addField('!invite', 'Invite me to your server!')
      .addField('!subscribe [type]', 'Set a certain type of news to feed into the channel.\nCurrently accepted types:' +
      '\n- chiefdelphi\n- tba (in development)\n- frcblog\n- frcqa\n- twitch\n- yt\n- reddit')
      .addField('Need more help?', 'DM Michael | ASIANBOI#4150 with any questions!')
    msg.channel.send({ embed: help })
  }
})

bot.on('ready', () => {
  console.log(`${bot.user.username} is online and ready!`)
  bot.user.setGame('with FRC news')

  var object = [
    {
      "type": "discord",
      "channel": "370684908462538752"
    }
  ]

  try { fs.mkdirSync('data'); } catch (err) { }

  for (var i = 0; i < types.length; i++) {
    try {
      require('./data/' + types[i] + '.json')
    } catch (err) {
      console.log('Creating ' + './data/' + types[i] + '.json')
      var writeStream = fs.createWriteStream('./data/' + types[i] + '.json');
      writeStream.write(JSON.stringify(object, null, "\t"));
      writeStream.end();
    }
  }
})

try {
  bot.login(config.token);
} catch (err) {
  console.log('Error logging into Discord: \n' + err)
}