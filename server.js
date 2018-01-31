var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/chiefdelphi', function (req, res) {
  console.log(req.body);
})

app.post('/tba', function (req, res) {
  console.log(req.body);
})

app.get('/', (req, res) => res.send('hello world'))

app.listen(8080)
