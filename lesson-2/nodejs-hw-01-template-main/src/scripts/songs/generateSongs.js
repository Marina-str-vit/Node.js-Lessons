import { readSongs } from "../../utils/songs/readSongs.js";
import { createFakeSong } from "../../utils/songs/createFakeSong.js";
import { writeSongs } from "../../utils/songs/writeSongs.js";

const generateSongs = async (number) => {
    const songList = await readSongs();
    const newSongs = Array(number).fill(0).map(createFakeSong);
    const newList = [...songList, ...newSongs];
    await writeSongs(newList);
};

generateSongs(5);
