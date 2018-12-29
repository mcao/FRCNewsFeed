const Server = require("./server"),
  news = new Server(),
  Discord = require("discord.js"),
  bot = new Discord.Client(),
  config = require("./config.json"),
  fs = require("fs"),
  types = [
    "chiefdelphi",
    "tba",
    "frcblog",
    "frcqa",
    "twitch",
    "reddit",
    "yt",
    "jvn"
  ];

news.on("chiefdelphi", data => {
  var cdEmbed = new Discord.RichEmbed()
    .setAuthor("New Post on Chief Delphi!", null, "http://chiefdelphi.com")
    .setDescription(
      `[**${data.title}**](${data.link}) submitted by ${data.author}`
    )
    .setColor("#ff8800")
    .setFooter(data.category)
    .setTimestamp(new Date(data.date));
  try {
    var cdChannels = require("./data/chiefdelphi.json");
    for (var i = 0; i < cdChannels.length; i++) {
      if (
        cdChannels[i].type == "discord" &&
        bot.channels.get(cdChannels[i].channel)
      ) {
        bot.channels.get(cdChannels[i].channel).send({ embed: cdEmbed });
      }
    }
    console.log(
      "Sent Chief Delphi News to " + cdChannels.length + " channels!"
    );
  } catch (err) {
    console.log("Error with Chief Delphi News:\n" + err.stack);
  }
});

news.on("jvn", data => {
  var jvnEmbed = new Discord.RichEmbed()
    .setAuthor("New Post on John V-Neun's Blog!", null, "https://johnvneun.com")
    .setDescription(
      `[**${data.title}**](${data.link}) posted by ${data.author}`
    )
    .setColor("#000001")
    .setImage(data.image ? data.image : "")
    .setTimestamp(new Date(data.date));
  try {
    var jvnChannels = require("./data/jvn.json");
    for (var i = 0; i < jvnChannels.length; i++) {
      if (
        jvnChannels[i].type == "discord" &&
        bot.channels.get(jvnChannels[i].channel)
      ) {
        bot.channels.get(jvnChannels[i].channel).send({ embed: jvnEmbed });
      }
    }
    console.log("Sent JVN News to " + jvnChannels.length + " channels!");
  } catch (err) {
    console.log("Error with JVN News:\n" + err.stack);
  }
});

news.on("tba", data => {
  // Work on different types and making each specific
  if (JSON.stringify(data, null, "\t").length < 2001)
    bot.channels
      .get("370684908462538752")
      .send("```" + JSON.stringify(data, null, "\t") + "```");
});

news.on("frcblog", data => {
  var news = new Discord.RichEmbed()
    .setAuthor("New FRC Blog Post!", null, data.link)
    .setDescription(`[**${data.title}**](${data.link}) by ${data.author}`)
    .setColor("#00A0E2")
    .setTimestamp(new Date(data.date));

  try {
    var blogChannels = require("./data/frcblog.json");
    for (var i = 0; i < blogChannels.length; i++) {
      if (
        blogChannels[i].type == "discord" &&
        bot.channels.get(blogChannels[i].channel)
      ) {
        bot.channels.get(blogChannels[i].channel).send({ embed: news });
      }
    }
    console.log("Sent FRC Blog to " + blogChannels.length + " channels!");
  } catch (err) {
    console.log("Error with FRC Blog:\n" + err.stack);
  }
});

news.on("frcqa", data => {
  var news = new Discord.RichEmbed()
    .setAuthor("New FRC Q&A Answer!", null, data.link)
    .setDescription(`[**${data.title}**](${data.link})`)
    .setColor("#00A0E2")
    .setTimestamp(new Date(data.date));

  try {
    var qaChannels = require("./data/frcqa.json");
    for (var i = 0; i < qaChannels.length; i++) {
      if (
        qaChannels[i].type == "discord" &&
        bot.channels.get(qaChannels[i].channel)
      ) {
        bot.channels.get(qaChannels[i].channel).send({ embed: news });
      }
    }
    console.log("Sent FRC Q&A to " + qaChannels.length + " channels!");
  } catch (err) {
    console.log("Error with FRC Q&A:\n" + err.stack);
  }
});

news.on("twitch", data => {
  var twitche = new Discord.RichEmbed()
    .setAuthor(
      `Twitch`,
      "https://d1qb2nb5cznatu.cloudfront.net/startups/i/114142-19c0993bf69c468f1350fd422bfad6b2-medium_jpg.jpg",
      `http://twitch.tv${data.channelName}`
    )
    .setDescription(`${data.channelName} just went live on Twitch!`)
    .setColor(6570405)
    .addField(`🎮 Game`, data.game, true)
    .addField("👁 Viewers", data.viewers, true)
    .setFooter(data.channelName)
    .setTimestamp(new Date(data.startedAt))
    .setImage(data.preview);

  try {
    var twitchChannels = require("./data/twitch.json");
    for (var i = 0; i < twitchChannels.length; i++) {
      if (
        twitchChannels[i].type == "discord" &&
        bot.channels.get(twitchChannels[i].channel)
      ) {
        bot.channels.get(twitchChannels[i].channel).send({ embed: twitche });
      }
    }
    console.log(
      "Sent Twitch Notifs to " + twitchChannels.length + " channels!"
    );
  } catch (err) {
    console.log("Error with Twitch Notifs:\n" + err.stack);
  }
});

news.on("reddit", data => {
  var news = new Discord.RichEmbed()
    .setAuthor("New Post on /r/FRC!", null, "https://reddit.com/r/FRC")
    .setDescription(
      `[**${data.title}**](${data.postURL}) submitted by ${data.author}`
    )
    .setColor("#cee3f8");
  if (data.imageURL != "http://ifttt.com/images/no_image_card.png")
    news.setImage(data.imageURL);
  try {
    var redditChannels = require("./data/reddit.json");
    for (var i = 0; i < redditChannels.length; i++) {
      if (
        redditChannels[i].type == "discord" &&
        bot.channels.get(redditChannels[i].channel)
      ) {
        bot.channels.get(redditChannels[i].channel).send({ embed: news });
      }
    }
    console.log("Sent Reddit News to " + redditChannels.length + " channels!");
  } catch (err) {
    console.log("Error with Reddit News:\n" + err.stack);
  }
});

news.on("yt", data => {
  var yt = new Discord.RichEmbed()
    .setAuthor(`New Video on ${data.channel}`, null, data.url)
    .setDescription(`[${data.name}](${data.url}) (${data.duration})`)
    .setColor("#ff0000")
    .setFooter(data.channel)
    .setTimestamp(new Date(data.date))
    .setImage(data.thumbnail);

  try {
    var ytChannels = require("./data/yt.json");
    for (var i = 0; i < ytChannels.length; i++) {
      if (
        ytChannels[i].type == "discord" &&
        bot.channels.get(ytChannels[i].channel)
      ) {
        bot.channels.get(ytChannels[i].channel).send({ embed: yt });
      }
    }
    console.log("Sent YT to " + ytChannels.length + " channels!");
  } catch (err) {
    console.log("Error with YT:\n" + err.stack);
  }
});

bot.on("message", msg => {
  if (msg.content == "!invite") {
    msg.reply(
      "<https://discordapp.com/api/oauth2/authorize?client_id=408392282178453505&permissions=67193857&scope=bot>"
    );
  } else if (msg.content.startsWith("!subscribe")) {
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return msg.reply(
        "sorry, but you mut have `Manage Server` to run this command!"
      );
    var args = msg.content
      .split(" ")
      .splice(1)
      .join(" ");
    if (args.split(" ")[0].toLowerCase() == "all") {
      var subscribed = "";
      var subscribedCount = 0;
      var alreadySubscribed = "";
      var alreadySubscribedCount = 0;
      var notFoundCount = 0;

      for (var i = 0; i < types.length; i++) {
        try {
          var found2 = false;
          var subJson = fs.readFileSync(`./data/${types[i]}.json`),
            sub = JSON.parse(subJson);
          for (var k = 0; k < sub.length; k++) {
            if (sub[k].channel == msg.channel.id) {
              alreadySubscribedCount++;
              alreadySubscribed += types[i] + "\n";
              found2 = true;
            }
          }
          if (!found2) {
            sub.push({ type: "discord", channel: msg.channel.id });
            fs.writeFileSync(
              `./data/${types[i]}.json`,
              JSON.stringify(sub, null, 3)
            );
            delete require.cache[require.resolve(`./data/${types[i]}.json`)];
            subscribed += types[i] + "\n";
            subscribedCount++;
          }
        } catch (err) {
          msg.channel.send("An error has occurred:\n" + err.stack);
        }
      }

      var subEmbed = new Discord.RichEmbed()
        .setFooter(bot.user.username)
        .setTimestamp()
        .setColor(msg.guild.me.displayColor);
      if (subscribedCount > 0) {
        subEmbed.addField(
          `Successfully subscribed to ${subscribedCount} source(s)!`,
          subscribed
        );
      }
      if (alreadySubscribedCount > 0) {
        subEmbed.addField(
          `You were already subscribed to ${alreadySubscribedCount} source(s)!`,
          alreadySubscribed
        );
      }
      if (notFoundCount > 0) {
        subEmbed.addField(
          `Couldn't find ${notFoundCount} source(s)!`,
          "Try !help to get a list of valid sources!"
        );
      }

      msg.channel.send({ embed: subEmbed });
    } else {
      var subscribed = "";
      var subscribedCount = 0;
      var alreadySubscribed = "";
      var alreadySubscribedCount = 0;
      var notFoundCount = 0;
      var subs = [];

      if (args.indexOf(",") > -1) {
        subs = args.split(",");
      } else if (args !== null) {
        subs[0] = args;
      } else {
        return msg.channel.send(
          "Please specify something you would like to subscribe to!"
        );
      }

      console.log(subs);

      for (var i = 0; i < subs.length; i++) {
        var found = false;
        subs[i] = subs[i].trim();
        for (var j = 0; j < types.length; j++) {
          if (types[j].toLowerCase() === subs[i].toLowerCase()) {
            console.log("Found " + subs[i]);
            found = true;
            try {
              var found2 = false;
              var subJson = fs.readFileSync(`./data/${subs[i]}.json`),
                sub = JSON.parse(subJson);
              for (var k = 0; k < sub.length; k++) {
                if (sub[k].channel == msg.channel.id) {
                  alreadySubscribedCount++;
                  alreadySubscribed += subs[i] + "\n";
                  found2 = true;
                }
              }
              if (!found2) {
                sub.push({ type: "discord", channel: msg.channel.id });
                fs.writeFileSync(
                  `./data/${subs[i]}.json`,
                  JSON.stringify(sub, null, 3)
                );
                delete require.cache[require.resolve(`./data/${subs[i]}.json`)];
                subscribed += subs[i] + "\n";
                subscribedCount++;
              }
            } catch (err) {
              msg.channel.send("An error has occurred:\n" + err.stack);
            }
          }
        }
        if (!found) {
          console.log("Could not find " + subs[i].trim());
          notFoundCount++;
        }
      }

      var subEmbed = new Discord.RichEmbed()
        .setFooter(bot.user.username)
        .setTimestamp()
        .setColor(msg.guild.me.displayColor);
      if (subscribedCount > 0) {
        subEmbed.addField(
          `Successfully subscribed to ${subscribedCount} source(s)!`,
          subscribed
        );
      }
      if (alreadySubscribedCount > 0) {
        subEmbed.addField(
          `You were already subscribed to ${alreadySubscribedCount} source(s)!`,
          alreadySubscribed
        );
      }
      if (notFoundCount > 0) {
        subEmbed.addField(
          `Couldn't find ${notFoundCount} source(s)!`,
          "Try !help to get a list of valid sources!"
        );
      }

      msg.channel.send({ embed: subEmbed });
    }
  } else if (msg.content.startsWith("!unsubscribe")) {
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return msg.reply(
        "sorry, but you mut have `Manage Server` to run this command!"
      );
    var args = msg.content
      .split(" ")
      .splice(1)
      .join(" ");
    if (args.split(" ")[0].toLowerCase() == "all") {
      var subscribed = "";
      var subscribedCount = 0;

      for (var i = 0; i < types.length; i++) {
        try {
          var found2 = false;
          var subJson = fs.readFileSync(`./data/${types[i]}.json`),
            sub = JSON.parse(subJson);
          for (var k = 0; k < sub.length; k++) {
            if (sub[k].channel == msg.channel.id) {
              sub.splice(k, 1);
              fs.writeFileSync(
                `./data/${types[i]}.json`,
                JSON.stringify(sub, null, 3)
              );
              delete require.cache[require.resolve(`./data/${types[i]}.json`)];
              subscribed += types[i] + "\n";
              subscribedCount++;
            }
          }
        } catch (err) {
          msg.channel.send("An error has occurred:\n" + err.stack);
        }
      }

      var subEmbed = new Discord.RichEmbed()
        .setFooter(bot.user.username)
        .setTimestamp()
        .setColor(msg.guild.me.displayColor);
      if (subscribedCount > 0) {
        subEmbed.addField(
          `Unsubscribed from ${subscribedCount} source(s)!`,
          subscribed
        );
      }

      msg.channel.send({ embed: subEmbed });
    } else {
      var subscribed = "";
      var subscribedCount = 0;
      var alreadySubscribed = "";
      var alreadySubscribedCount = 0;
      var notFoundCount = 0;
      var subs = [];

      if (args.indexOf(",") > -1) {
        subs = args.split(",");
      } else if (args !== null) {
        subs[0] = args;
      } else {
        return msg.channel.send(
          "Please specify something you would like to unsubscribe from!"
        );
      }

      console.log(subs);

      for (var i = 0; i < subs.length; i++) {
        var found = false;
        subs[i] = subs[i].trim();
        for (var j = 0; j < types.length; j++) {
          if (types[j].toLowerCase() === subs[i].toLowerCase()) {
            console.log("Found " + subs[i]);
            found = true;
            try {
              var subJson = fs.readFileSync(`./data/${subs[i]}.json`),
                sub = JSON.parse(subJson);
              for (var k = 0; k < sub.length; k++) {
                if (sub[k].channel == msg.channel.id) {
                  sub.splice(k, 1);
                  fs.writeFileSync(
                    `./data/${subs[i]}.json`,
                    JSON.stringify(sub, null, 3)
                  );
                  delete require.cache[
                    require.resolve(`./data/${subs[i]}.json`)
                  ];
                  subscribed += subs[i] + "\n";
                  subscribedCount++;
                }
              }
            } catch (err) {
              msg.channel.send("An error has occurred:\n" + err.stack);
            }
          }
        }
      }

      var subEmbed = new Discord.RichEmbed()
        .setFooter(bot.user.username)
        .setTimestamp()
        .setColor(msg.guild.me.displayColor);
      if (subscribedCount > 0) {
        subEmbed.addField(
          `Unsubscribed ${subscribedCount} source(s)!`,
          subscribed
        );
      }

      msg.channel.send({ embed: subEmbed });
    }
  } else if (msg.content == "!help") {
    var help = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setColor(msg.guild.me.displayHexColor)
      .setDescription("Command Overview")
      .setFooter(bot.user.username)
      .setTimestamp()
      .addField("!invite", "Invite me to your server!")
      .addField(
        "!subscribe [type | all]",
        "Set a certain type of news to feed into the channel.\nCurrently accepted types:" +
          "\n- chiefdelphi\n- tba (in development)\n- frcblog\n- frcqa\n- twitch\n- yt\n- reddit\n- jvn"
      )
      .addField(
        "!unsubscribe [type | all]",
        "Unsubscribe from a certain type of news."
      )
      .addField("Need more help?", "DM michaelcao#0001 with any questions!");
    msg.channel.send({ embed: help });
  } else if (msg.content.startsWith("!eval")) {
    if (msg.author.id != "171319044715053057") return;
    var toEval = msg.content
      .split(" ")
      .splice(1)
      .join(" ");
    try {
      var evaled = eval(toEval);
      bot.channels.get("370684908462538752").send("```js\n" + evaled + "```");
    } catch (err) {
      bot.channels.get("370684908462538752").send("```" + err + "```");
    }
  }
});

bot.on("ready", () => {
  console.log(`${bot.user.username} is online and ready!`);
  bot.guilds.forEach(guild => {
    console.log(guild.name);
  });
  bot.user.setGame("with FRC news");

  var object = [
    {
      type: "discord",
      channel: "370684908462538752"
    }
  ];

  try {
    fs.mkdirSync("data");
  } catch (err) {}

  for (var i = 0; i < types.length; i++) {
    try {
      require("./data/" + types[i] + ".json");
    } catch (err) {
      console.log("Creating " + "./data/" + types[i] + ".json");
      var writeStream = fs.createWriteStream("./data/" + types[i] + ".json");
      writeStream.write(JSON.stringify(object, null, "\t"));
      writeStream.end();
    }
  }
});

try {
  bot.login(config.token);
} catch (err) {
  console.log("Error logging into Discord: \n" + err);
}
