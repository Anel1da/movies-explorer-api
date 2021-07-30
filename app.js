const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const mongoose = require("mongoose");
const NotFoundError = require("./errors/not-found-err"); // 404

mongoose.connect("mongodb://localhost:27017/movies-explorer", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// настраиваем порт
const { PORT = 3000 } = process.env;

// краш-тест сервера
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

// мидлвэры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// работа с роутами регистрации и авторизации
const { login, createUser, logout } = require("./controllers/users");
const userRoutes = require("./routes/users");

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser
);

app.post("/signout", logout);

// обработка ошибок
app.use(errors());
/* app.use("*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});
 */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
