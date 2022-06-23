import { Router } from 'express';
import { addMovie, deleteMovie, getMovies } from '../controllers/movies';
import { addMovieValidator, deleteMovieValidator } from '../middlwares/validator';

const Movies = Router();

Movies.get('/movies', getMovies);
Movies.post('/movies', addMovieValidator, addMovie);
Movies.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

export default Movies;
