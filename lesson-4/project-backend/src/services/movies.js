// папка для бізнес-логіки

import MovieCollection from "../db/models/Movie.js";

export const getMovies = ()=> MovieCollection.find(); // знаходимо всі БД на цей запит

export const getMovieById = id => MovieCollection.findById(id); // БД по id
