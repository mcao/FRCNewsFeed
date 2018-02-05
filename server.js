const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  { EventEmitter } = require('events')
var token = "",
  tba = false,
  crypto = require('crypto'),
  shasum = crypto.createHash('sha1');

class Server extends EventEmitter {
  constructor() {
    super();

    app.use(bodyParser.json({
      verify: function (req, res, buf, encoding) {
        req.rawBody = buf;
      }
    }));
    app.use(bodyParser.urlencoded({
      extended: false,
      verify: function (req, res, buf, encoding) {
        req.rawBody = buf;
      }
    }));

    app.listen(8080, () => {
      console.log('Server started at port 8080!')
      this.listen();
    })
  }

  listen() {
    var self = this;

    app.post('/api/:endpoint', function (req, res) {
      if (req.body.authorization) {
        token = req.body.authorization,
          tba = false
      } else if (req.headers["x-tba-checksum"]) {
        token = req.headers["x-tba-checksum"],
          tba = true
      }
      console.log(`Request Type: ${req.params.endpoint}`)
      console.log(`Token: ${token}`)
      self.auth(req.rawBody, token, tba).then(authorized => {
        if (authorized) {
          self.emit(req.params.endpoint, req.body);
          res.send('OK')
        } else {
          res.sendStatus(401);
        }
      })
    })

    app.get('/', (req, res) => res.send('Coming Soon(tm)'))

    console.log('Listeners initialized!')
  }

  auth(payload, token, isTba) {
    return new Promise(resolve => {
      if (isTba) {
        shasum.update(require('./config.json').secret)
        shasum.update(payload)
        console.log(`TBA: Calculated Hash is ${shasum.digest('hex')}`)
        shasum = crypto.createHash('sha1');
        if (token == shasum) resolve(true);
        else resolve(false);
      } else if (token == require('./config.json').admintoken) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  }
}

module.exports = Server;