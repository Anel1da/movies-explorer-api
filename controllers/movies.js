const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Movie = require("../models/movie");

const BadRequestError = require("../errors/bad-request-err"); // 400
const UnauthorizedError = require("../errors/unauthorized-err"); // 401
const ForbiddenError = require("../errors/forbidden-err"); // 403
const NotFoundError = require("../errors/not-found-err"); // 404
const ConflictError = require("../errors/conflict-err"); // 409

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .select("+owner")
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner = req.user._id,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректный данные"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new Error("NotValidId"))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie.remove();
        res.status(200).send({ message: "Фильм удален из сохраненных" });
      } else {
        throw new ForbiddenError("Недостаточно прав для удаления фильма");
      }
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        next(new NotFoundError("Фильм не найден"));
      }
      next(err);
    });
};