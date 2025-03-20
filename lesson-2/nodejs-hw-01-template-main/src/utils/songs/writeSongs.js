//  функ. що повторюються виносимо в папку utils!!

import fs from "node:fs/promises";

import { PATH_DB_SONGS } from "../../constants/songs.js";

// спочатку масив об'єктів перетворюємо на строку, а потім вже перезапусуємо дані, тому і використовуємо stringify
// аргументи в stringify: null - ми не хочеми, щоб одні символи замінили на інші; 2 - відступи, щоб була нормальна кількість строк
export const writeSongs = songs => fs.writeFile(PATH_DB_SONGS, JSON.stringify(songs, null, 2));
