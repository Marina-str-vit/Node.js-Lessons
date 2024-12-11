import {Router} from "express";

import * as moviesController from "../controllers/movies.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(moviesController.getMoviesController));

moviesRouter.get("/:id", ctrlWrapper(moviesController.getMovieByIdController));

export default moviesRouter;
