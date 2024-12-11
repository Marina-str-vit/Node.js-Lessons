import createError from "http-errors";

import * as movieServices from "../services/movies.js";

export const getMoviesController = async (req, res)=> {
    const data = await movieServices.getMovies();

    res.json({
        status: 200,
        messsage: "Successfully found movies",
        data,
    });
};

export const getMovieByIdController = async(req, res)=> {
    const {id} = req.params;

    const data = await movieServices.getMovieById(id);

    if(!data) {
        throw createError(404, `Movie with id=${id} not found`);
        // const error = new Error(`Movie with id=${id} not found`);
        // error.status = 404;
        // throw error;
    }

    res.json({
        status: 200,
        message: `Successfully find movie with id=${id}`,
        data,
    });
};
