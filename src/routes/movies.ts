import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { addMovie, deleteMovie, getMovies } from '../controllers/movies';

export const Movies = Router();

Movies.get('/', getMovies);

Movies.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().min(2).max(30).required(),
      director: Joi.string().min(2).max(30).required(),
      duration: Joi.number().required(),
      year: Joi.number().min(1900).max(2025).required(),
      description: Joi.string().required(),
      image: Joi.string()
        .pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)
        .required(),
      trailer: Joi.string()
        .pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)
        .required(),
      thumbnail: Joi.string()
        .pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)
        .required(),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie
);

Movies.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().min(24).max(24),
    }),
  }),
  deleteMovie
);
