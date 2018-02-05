var Server = require('./server'),
  news = new Server();

news.on('chiefdelphi', (data) => {
  console.log(data);
});

news.on('tba', (data) => {
  console.log(data);
});