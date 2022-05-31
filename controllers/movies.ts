import { Request, Response, NextFunction } from 'express';
import { MoviePayload } from './types';
import ValidationError from '../errors/ValidationError';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import MovieModel from '../models/movies';
import ForbiddenError from '../errors/ForbiddenError';
import { errorMessages } from '../utils/messages';

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await MovieModel.find();
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

export const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  const moviePayload: MoviePayload = req.body;
  try {
    const movie = await MovieModel.create({ ...moviePayload, owner: req.user!._id });
    res.send(movie);
  } catch (err: any) {
    if (err.code === 11000) {
      next(new ConflictError(errorMessages.addMovieConflict));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError(errorMessages.incorrectData));
      next(err);
    }
  }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    if (!movie) throw new NotFoundError(errorMessages.movieNotFound);

    const isOwner = req.user!._id === movie.owner.toString();
    if (!isOwner) throw new ForbiddenError(errorMessages.notMovieOwner);

    await MovieModel.findByIdAndDelete(req.params.id);
    res.send(errorMessages.movieDeleted);
  } catch (err: any) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError(errorMessages.incorrectData));
    }
    next(err);
  }
};
