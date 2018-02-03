const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  EventEmitter = require('events');

class Server extends EventEmitter {
  constructor() {
    super();

    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({
      extended: true
    }))

    app.post('/chiefdelphi', function (req, res) {
      res.send('OK');
      this.emit('chiefdelphi', req.body);
    })

    app.post('/tba', function (req, res) {
      res.send('OK');
      this.emit('tba', req.body);
    })

    app.post('/frcqa', function (req, res) {
      res.send('OK');
      this.emit('frcqa', req.body);
    })

    app.post('/frcblog', function (req, res) {
      res.send('OK');
      this.emit('frcblog', req.body);
    })

    // No functionality yet
    app.post('/toa', function (req, res) {
      res.send('OK');
      this.emit('toa', req.body);
    })

    // Public
    app.post('/reddit', function (req, res) {
      res.send('OK');
      this.emit('reddit', req.body);
    })

    app.post('/twitch', function (req, res) {
      res.send('OK');
      this.emit('twitch', req.body);
    })

    app.post('/yt', function (req, res) {
      res.send('OK');
      this.emit('yt', req.body);
    })

    app.post('/twitter', function (req, res) {
      res.send('OK');
      this.emit('twitter', req.body);
    })

    app.post('/instagram', function (req, res) {
      res.send('OK');
      this.emit('instagram', req.body);
    })

    app.post('/facebook', function (req, res) {
      res.send('OK');
      this.emit('facebook', req.body);
    })

    app.get('/', (req, res) => res.send('hello world'))

    app.listen(8080, () => {
      console.log('Server started at port 8080!')
    })
  }
}

module.exports = Server;