import { Request, Response, NextFunction } from 'express';
import { MoviePayload } from './types';
import { ValidationError } from '../errors/ValidationError';
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { MovieModel } from '../models/movies';
import { ForbiddenError } from '../errors/ForbiddenError';

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await MovieModel.find();
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

export const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { trailer, ...rest }: MoviePayload = req.body;
  try {
    const movie = await MovieModel.create({ ...rest, owner: req.user!._id, trailerLink: trailer });
    res.send(movie);
  } catch (err: any) {
    if (err.code === 11000) {
      next(new ConflictError('This movie already saved'));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError('Incorrect data'));
      next(err);
    }
  }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    if (movie) {
      const isOwner = req.user!._id === movie.owner.toString();
      if (!isOwner) throw new ForbiddenError('You are not the owner of this movie');
      await MovieModel.findByIdAndDelete(req.params.id);
      res.send('Movie deleted');
    } else throw new NotFoundError('No movie found');
  } catch (err: any) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError('Incorrect data'));
      next(err);
    }
  }
};
