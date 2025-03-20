// константи, що повторюються виносимо в папку constants !!!

import path from "node:path";

// оба варіанти вірні, але другий коротший

// 1 варіант)
// export const PATH_DB_SONGS = path.join(process.cwd(), "src", "db", "db-songs.json");

// 2 варіант отримання PATH_DB_SONGS
export const PATH_DB_SONGS = path.resolve("src", "db", "db-songs.json");

