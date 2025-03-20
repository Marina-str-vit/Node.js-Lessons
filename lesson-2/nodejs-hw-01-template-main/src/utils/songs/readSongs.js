//  функ. що повторюються виносимо в папку utils!!

// використ. в функ. проміс тому додаю "/promises" в імпорт
import {readFile} from "node:fs/promises";

import { PATH_DB_SONGS } from "../../constants/songs.js";

// 1 - "utf-8" перекодовує бінарний текст в строку
// 2 - прогнали текст через JSON.parse(data) і отримала масив об'єктів
export const readSongs = async () => {
    const data = await readFile(PATH_DB_SONGS, "utf-8");
    return JSON.parse(data);
};
