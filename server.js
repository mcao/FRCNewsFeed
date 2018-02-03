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

    app.post('/chiefdelphi', function (req, res) {
      res.send('OK');
      emitEvent('chiefdelphi', req.body);
    })

    app.post('/tba', function (req, res) {
      res.send('OK');
      emitEvent('tba', req.body);
    })

    app.post('/frcqa', function (req, res) {
      res.send('OK');
      emitEvent('frcqa', req.body);
    })

    app.post('/frcblog', function (req, res) {
      res.send('OK');
      emitEvent('frcblog', req.body);
    })

    // No functionality yet
    app.post('/toa', function (req, res) {
      res.send('OK');
      emitEvent('toa', req.body);
    })

    // Public
    app.post('/reddit', function (req, res) {
      res.send('OK');
      emitEvent('reddit', req.body);
    })

    app.post('/twitch', function (req, res) {
      res.send('OK');
      emitEvent('twitch', req.body);
    })

    app.post('/yt', function (req, res) {
      res.send('OK');
      emitEvent('yt', req.body);
    })

    app.post('/twitter', function (req, res) {
      res.send('OK');
      emitEvent('twitter', req.body);
    })

    app.post('/instagram', function (req, res) {
      res.send('OK');
      emitEvent('instagram', req.body);
    })

    app.post('/facebook', function (req, res) {
      res.send('OK');
      emitEvent('facebook', req.body);
    })

    app.get('/', (req, res) => res.send('hello world'))

    console.log('Listeners initialized!')

    function emitEvent(type, content) {
      this.emit(type, content);
    }
  }
}

module.exports = Server;