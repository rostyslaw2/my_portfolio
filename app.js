const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
const multer = require('multer'); // Для обробки завантажених файлів
const path = require('path');

require("dotenv").config();
const Cart = require("./models/Cart1");

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/views"));
app.use(express.static("public"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

// Налаштування Multer для завантаження файлів
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // Зберігаємо файли в папці public/images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.render('house');
});

app.post('/add', upload.single('avatar'), async (req, res) => {
  const { name, age } = req.body;
  const avatar = req.file.path; // Шлях до завантаженого аватару
  const newCart = new Cart({ name, age, avatar }); // Додаємо поле для аватару в об'єкт користувача
  await newCart.save();
  res.render('result', { name, age, avatar }); // Передаємо шлях до аватару на сторінку результату
});

app.get('/basa', function (req, res) {
  res.render('basa');
});

app.get('/all', async (req, res) => {
  const AllCart = await Cart.find();
  res.render('all', { AllCart });
});

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
      console.log('Connected to database');
    });
  } catch (e) {
    console.log(e)
  }
}

start();
