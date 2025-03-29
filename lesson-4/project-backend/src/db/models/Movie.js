import {Schema, model} from "mongoose";

// це є обмеження на рівні запитів до бази даних
const movieSchema = new Schema({  // монгуз схема - як має виглядати об1єкт в коллекції
    title: {
        type: String, 
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    favorite: {  // УВАГА СПЕЦІФІКА mongoose
        type: Boolean,
        default: false, // щоб сюди не додалось поле NULL потрібно вказати  required: true,
        required: true,
    },
    type: {
        type: String,
        enum: ["film", "serial"],
        default: "film",
        required: true,
    }
});
// це клас який з'єднаний з колекцією movie, якщо колекції НЕ ІСНУЄ, то mongoose її створить
const MovieCollection = model("movie", movieSchema); // це клас, що робить запит і створює коллекцію
// categories => category // розуміє однину та множину, як треба сам може її перетворювати
// mice => mouse

export default MovieCollection;

