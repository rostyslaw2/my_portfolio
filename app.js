const express = require('express');
const app = express();
const ejs = require('ejs')
app.set('view engine', 'ejs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.render('house') // render відкриває htmll файл
})
//app.post('/add', (req, res) => {
//  const name = req.body.name
//  const email = req.body.email
//
//  res.render('result', { name, email })
//})






app.get('/basa', function (req, res) { // get просто відкриває файл
  res.render('basa') // render відкриває htmll файл
})

console.log('Example app listening on port 4000!')
app.listen(basa)