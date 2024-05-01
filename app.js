const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
require("dotenv").config();
const Cart = require("./models/Cart1");
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));

app.use(express.static("public"));



const bodyParser = require('body-parser');
const Cart1 = require('./models/Cart1');
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.render('house') // render відкриває htmll файл з передачою файлів
})
app.post('/add', async (req, res) => { // post дістає з форми htmll
  //const name = req.body.name
  //const email = req.body.email
  //const age = req.body.age
const { name,  age } = req.body // заміна верхніх 3 рядків
  const newCart = new Cart({ name,  age })
  await newCart.save()
  res.render('result', { name,  age })
})


app.get('/basa', function (req, res) { // get просто відкриває файл
  res.render('basa') // render відкриває htmll файл
})

console.log('Example app listening on port 3000!')

app.get('/all', async(req, res) => { // get просто відкриває файл
  const AllCart = await Cart1.find() // ми дістаємо всіх користовачів з моделі Cart1
  res.render('all', { AllCart }) // відкриваєм і передаємо
})


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