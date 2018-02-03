var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}))

// FRC Q and A, TOA, /r/FRC, Twitch, YouTube, FRC Blog

app.post('/chiefdelphi', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

app.post('/tba', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

app.post('/frcqa', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

app.post('/frcblog', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

// No functionality yet
app.post('/toa', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

app.post('/reddit', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

app.post('/twitch', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

// No functionality yet
app.post('/yt', function (req, res) {
  console.log(req.body);
  res.send('ok');
})

app.get('/', (req, res) => res.send('hello world'))

app.listen(8080)
