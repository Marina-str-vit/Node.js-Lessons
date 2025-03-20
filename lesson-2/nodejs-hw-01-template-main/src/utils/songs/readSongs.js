//  функ. що повторюються виносимо в папку utils!!

// використ. в функ. проміс тому додаю "/promises" в імпорт
import {readFile} from "node:fs/promises";

import { PATH_DB_SONGS } from "../../constants/songs.js";

// "utf-8" перекодовує бінарний текст в строку
export const readSongs = async () => {
    const data = await readFile(PATH_DB_SONGS, "utf-8");
    return JSON.parse(data);
};
