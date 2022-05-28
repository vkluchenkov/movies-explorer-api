import * as mongoose from 'mongoose';
import isURL from 'validator/lib/isURL';
import { Movie } from '../controllers/types';

const movieSchema = new mongoose.Schema<Movie>({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  year: {
    type: Number,
    minlength: 4,
    maxlength: 4,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, 'Incorrect url'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [isURL, 'Incorrect url'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [isURL, 'Incorrect url'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    unique: true,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const MovieModel = mongoose.model<Movie>('movie', movieSchema);

export default MovieModel;
