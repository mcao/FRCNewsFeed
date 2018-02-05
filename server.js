const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  { EventEmitter } = require('events')
var token = "";

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

    app.post('/api/:endpoint', function(req, res) {
      if (req.body.authorization)
        token = req.body.authorization
      else if (req.headers["x-tba-checksum"]) // frcnewsfeedhook
        token = req.headers["x-tba-checksum"]
      console.log(`Token ${token} | Request ${req.params.endpoint}`)
      self.auth(token).then(authorized => {
        if (authorized) {
          self.emit(req.params.endpoint, req.body);
          res.send('OK')
        } else {
          res.sendStatus(401);
        }
      })
    })

    // Public
    app.post('/api/reddit', function (req, res) {
      res.send('OK');
      self.emit('reddit', req.body);
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

  auth(token) {
    return new Promise(resolve => {
      if (token)
        resolve(true);
      else
        resolve(false);
    })
  }
}

module.exports = Server;