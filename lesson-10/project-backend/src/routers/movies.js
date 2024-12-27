import {Router} from "express";

import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";

import * as moviesController from "../controllers/movies.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";

import { movieAddSchema, movieUpdateSchema } from "../validation/movies.js";

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", ctrlWrapper(moviesController.getMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(moviesController.getMovieByIdController));

moviesRouter.post("/", validateBody(movieAddSchema), ctrlWrapper(moviesController.addMovieController));

moviesRouter.put("/:id", isValidId, validateBody(movieAddSchema), ctrlWrapper(moviesController.upsertMovieController));

moviesRouter.patch("/:id", isValidId, validateBody(movieUpdateSchema), ctrlWrapper(moviesController.patchMovieController));

moviesRouter.delete("/:id", isValidId, ctrlWrapper(moviesController.deleteMovieController));

export default moviesRouter;
