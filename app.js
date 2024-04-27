const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
require("dotenv").config();
const Cart = require("./models/Cart");

app.set('view engine', 'ejs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.render('house') // render відкриває htmll файл з передачою файлів
})
app.post('/add', async (req, res) => { // post дістає з форми htmll
  const name = req.body.name
  const email = req.body.email
  const newCart = new Cart({ name, email })
  await newCart.save()
  res.render('result', { name, email })
})






app.get('/basa', function (req, res) { // get просто відкриває файл
  res.render('basa') // render відкриває htmll файл
})

console.log('Example app listening on port 3000!')


const start = async () => { // робить асинхронну функцію
  try {  // запоскає код
    await mongoose.connect(`${process.env.DB_URL}`) //чекає підключення бази даних
    app.listen(3000)
    console.log('Connected to database')
  } catch (e) { //ловить помилки
    console.log(e)
  }
}



start()