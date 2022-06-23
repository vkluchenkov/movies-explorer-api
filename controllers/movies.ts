import { Request, Response, NextFunction } from 'express';
import { MoviePayload } from './types';
import ValidationError from '../errors/ValidationError';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import MovieModel from '../models/movies';
import { errorMessages } from '../utils/messages';

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const owner = req.user!._id;
    const movies = await MovieModel.find({ owner });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

export const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  const moviePayload: MoviePayload = req.body;
  try {
    const movie = await MovieModel.findOne({ movieId: moviePayload.movieId });
    if (movie) {
      const isOwner = req.user!._id === movie.owner.toString();
      if (isOwner) throw new ConflictError(errorMessages.addMovieConflict);
    }
    const newMovie = await MovieModel.create({ ...moviePayload, owner: req.user!._id });
    res.send(newMovie);
  } catch (err: any) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError(errorMessages.incorrectData));
      next(err);
    }
  }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await MovieModel.findOne({ movieId: req.params.movieId, owner: req.user!._id });

    if (!movie) throw new NotFoundError(errorMessages.movieNotFound);

    await MovieModel.findByIdAndDelete(movie._id);
    res.send({ message: errorMessages.movieDeleted });
  } catch (err: any) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError(errorMessages.incorrectData));
    }
    next(err);
  }
};
