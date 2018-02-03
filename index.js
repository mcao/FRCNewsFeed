var Server = require('./server'),
  news = new Server();

news.listen();

news.on('chiefdelphi', (data) => {
  console.log(data);
});