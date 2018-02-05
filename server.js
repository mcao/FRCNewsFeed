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

    // app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(function (req, res, next) {
      var data = '';
      req.setEncoding('utf8');
      req.on('data', function (chunk) {
        data += chunk;
      });
      req.on('end', function () {
        req.rawBody = data;
        next();
      });
    });
    app.use(express.bodyParser());

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
      console.log(`Request ${req.params.endpoint}`)
      console.log(`Hash Recieved: ${token}`)
      self.auth(req.body, token, tba).then(authorized => {
        if (authorized) {
          self.emit(req.params.endpoint, JSON.parse(req.body));
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
        shasum.update(String(payload))
        console.log(`TBA: Calculated Hash is ${shasum.digest('hex')}`)
        shasum = crypto.createHash('sha1');
      }
      resolve(true);
    })
  }
}

module.exports = Server;