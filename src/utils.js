import chapterData from "./chapters.json";
import * as _ from "underscore";

const chapterInfo = chapterData.chapterInfo;

const bookNames = {
    AGOT: "A Game of Thrones",
    ACOK: "A Clash of Kings",
    ASOS: "A Storm of Swords",
    AFFC: "A Feast for Crows",
    ADWD: "A Dance with Dragons"
};

const bookWikiNames = {
    AGOT: "A_Game_of_Thrones",
    ACOK: "A_Clash_of_Kings",
    ASOS: "A_Storm_of_Swords",
    AFFC: "A_Feast_for_Crows",
    ADWD: "A_Dance_with_Dragons"
};

const epilogueChapters = {
    224: true,
    343: true
};

export function capitalise(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
}

export function bookNameFromCode(code) {
    return bookNames[code];
}

export function getWikiURL(w) {
    // var chapterData = chapterData["default"];

    var base = "https://awoiaf.westeros.org/index.php/";
    var chapter = chapterInfo[w];
    if (!chapter) {
        return "";
    }
    var bookPart = bookWikiNames[chapter.book];
    var chapterPart =
        chapter.seq == 1
            ? "-Prologue"
            : epilogueChapters[chapter.id]
            ? "-Epilogue"
            : "-Chapter_" + (chapter.seq - 1); //seq starts at 0

    return base + bookPart + chapterPart;
}
