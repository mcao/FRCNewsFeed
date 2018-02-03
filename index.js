var Server = require('./server'),
  news = new Server();

news.on('chiefdelphi', (data) => {
  console.log(data);
});