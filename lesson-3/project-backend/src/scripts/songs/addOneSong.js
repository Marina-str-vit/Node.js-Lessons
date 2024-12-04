import {readSongs} from "../../utils/songs/readSongs.js";
import {createFakeSong} from "../../utils/songs/createFakeSong.js";
import {writeSongs} from "../../utils/songs/writeSongs.js";

const addOneSong = async ()=> {
    const songList = await readSongs();
    const song = createFakeSong();
    // songList.push(song);
    // await writeSongs(songList);
    await writeSongs([...songList, song]);
};

addOneSong();
