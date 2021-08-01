/* require("dotenv").config(); */
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");

mongoose.connect("mongodb://localhost:27017/movies-explorer", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// настраиваем порт
const { PORT = 3000 } = process.env;

const { login, createUser } = require("./controllers/users");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");

// мидлвэры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: "61065d5ab94d1b58acda3b19",
  };

  next();
});

// роуты регистрации и авторизации

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

/* app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login
);
 */

/* app.post("/signout", logout); */

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

// обработка ошибок
app.use(errors());
/* app.use("*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});
 */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
