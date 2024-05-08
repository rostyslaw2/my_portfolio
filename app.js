const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
//const multer = require('multer'); // Для обробки завантажених файлів
const path = require('path');

// Підключення dotenv для завантаження змінних середовища з файлу .env
require("dotenv").config();
// Підключення моделі Cart1 для роботи з даними користувачів
const Cart = require("./models/Cart1");

// Налаштування шаблонізатора EJS
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;

// Встановлення шляху до папки views для статичних файлів
app.use(express.static(__dirname + "/views"));


// Підключення middleware для обробки даних з форм
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('house'); // Рендерінг шаблону house.ejs
});

// Обробка POST запиту для додавання нового користувача
app.post('/add',  async (req, res) => {
  const { name, age , avatar} = req.body;
  //const avatar = req.file.path; // Шлях до завантаженого аватару

  const newCart = new Cart({ name, age, avatar }); // Створення нового об'єкту користувача з даними та аватаром
  await newCart.save(); // Збереження користувача в базу даних
  res.render('result', { name, age, avatar }); // Рендерінг шаблону result.ejs з даними користувача
});

// Обробка GET запиту для відображення сторінки "basa"
app.get('/basa', function (req, res) {
  res.render('basa'); // Рендерінг шаблону basa.ejs
});

// Обробка GET запиту для відображення всіх користувачів
app.get('/all', async (req, res) => {
  const AllCart = await Cart.find(); // Отримання всіх користувачів з бази даних
  res.render('all', { AllCart }); // Рендерінг шаблону all.ejs з даними про всіх користувачів
});

app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;//<form action="/delete/<%= user._id %>"> тому params
  console.log(id);
  await Cart.deleteOne({ _id: id });
; // Видалення користувача з бази даних
  res.redirect('/all');
})

// Функція для підключення до бази даних та запуску сервера
const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`); // Підключення до бази даних MongoDB
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`); // Виведення повідомлення про запуск сервера
      console.log('Connected to database'); // Виведення повідомлення про підключення до бази даних
    });
  } catch (e) {
    console.log(e) // Обробка помилок під час підключення до бази даних
  }
}

start(); // Виклик функції для підключення до бази даних та запуску сервера
