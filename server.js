const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  { EventEmitter } = require('events');

class Server extends EventEmitter {
  constructor() {
    super();

    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({
      extended: true
    }))

    app.listen(8080, () => {
      console.log('Server started at port 8080!')
      this.listen();
    })
  }

  listen() {
    var self = this;

    app.post('/chiefdelphi', function (req, res) {
      res.send('OK');
      self.emit('chiefdelphi', req.body);
    })

    app.post('/tba', function (req, res) {
      res.send('OK');
      self.emit('tba', req.body);
    })

    app.post('/frcqa', function (req, res) {
      res.send('OK');
      self.emit('frcqa', req.body);
    })

    app.post('/frcblog', function (req, res) {
      res.send('OK');
      self.emit('frcblog', req.body);
    })

    // No functionality yet
    app.post('/toa', function (req, res) {
      res.send('OK');
      self.emit('toa', req.body);
    })

    // Public
    app.post('/reddit', function (req, res) {
      res.send('OK');
      self.emit('reddit', req.body);
    })

    app.post('/twitch', function (req, res) {
      res.send('OK');
      self.emit('twitch', req.body);
    })

    app.post('/yt', function (req, res) {
      res.send('OK');
      self.emit('yt', req.body);
    })

    app.post('/twitter', function (req, res) {
      res.send('OK');
      self.emit('twitter', req.body);
    })

    app.post('/instagram', function (req, res) {
      res.send('OK');
      self.emit('instagram', req.body);
    })

    app.post('/facebook', function (req, res) {
      res.send('OK');
      self.emit('facebook', req.body);
    })

    app.get('/', (req, res) => res.send('hello world'))

    console.log('Listeners initialized!')
  }
}

module.exports = Server;