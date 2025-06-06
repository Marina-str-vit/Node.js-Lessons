import MovieCollection from "../db/models/Movie.js";

import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getMovies = async ({
        page = 1,
        perPage = 10,
        sortBy = "_id",
        sortOrder = "asc",
        filter = {},
    })=> {
    const limit = perPage;
    const skip = (page - 1) * limit;
    const moviesQuery = MovieCollection.find();

    if(filter.minReleaseYear) {
        moviesQuery.where("releaseYear").gte(filter.minReleaseYear);
    }
    if(filter.maxReleaseYear) {
        moviesQuery.where("releaseYear").lte(filter.maxReleaseYear);
    }
    if(filter.userId) {
        moviesQuery.where("userId").equals(filter.userId);
    }

    const items = await moviesQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder});
    const total = await MovieCollection.find().merge(moviesQuery).countDocuments();

    const paginationData = calcPaginationData({total, page, perPage});

    return {
        items,
        total,
        ...paginationData,
    };
};

export const getMovieById = id => MovieCollection.findById(id);

export const getMovie = filter => MovieCollection.findOne(filter);

export const addMovie = payload => MovieCollection.create(payload);

export const updateMovie = async (filter, payload, options = {}) => {
    const {upsert = false} = options;
    const result = await MovieCollection.findOneAndUpdate(filter, payload, {
        upsert,
        includeResultMetadata: true,
    });

    if(!result || !result.value) return null;

    const isNew = Boolean(result.lastErrorObject.upserted);

    return {
        isNew,
        data: result.value,
    };
};

export const deleteMovie = filter => MovieCollection.findOneAndDelete(filter);
