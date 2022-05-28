import { Router } from 'express';
import { addMovie, deleteMovie, getMovies } from '../controllers/movies';
import { addMovieValidator, deleteMovieValidator } from '../middlwares/validator';

const Movies = Router();

Movies.get('/', getMovies);
Movies.post('/', addMovieValidator, addMovie);
Movies.delete('/:id', deleteMovieValidator, deleteMovie);

export default Movies;
