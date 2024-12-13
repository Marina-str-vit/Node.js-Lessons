import {Schema, model} from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
        required: true,
    },
    releaseYear: {
        type: Number,
        min: 1985,
        required: true,
    },
    type: {
        type: String,
        enum: ["film", "serial"],
        default: "film",
        required: true,
    }
}, {versionKey:false, timestamps: true});

const MovieCollection = model("movie", movieSchema);
// categories => category
// mice => mouse

export default MovieCollection;

