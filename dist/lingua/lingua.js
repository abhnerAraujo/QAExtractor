"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("./../constants/paths");
const child_process = require("child_process");
const fs = require("fs");
class Lingua {
    constructor(language) {
        this.dataPath = "C:/Users/abhne/Documents/tcc/projeto/QAExtractor/assets/data/data.txt";
        this.scriptPath = paths_1.PATHS.linguakit;
        this.language = 'pt';
        this.tag = 'tagger';
        this.seg = "seg";
        this.language = language;
    }
    tagger(text) {
        let fileName = this.createDataFile(text);
        let result = "";
        let lingua = [];
        if (fileName) {
            result = this.runLingua(this.tag, fileName, "-nec");
            this.deleteFile(fileName);
            if (result && result.length > 0) {
                lingua = result.split("\r\n");
                return lingua;
            }
        }
        else {
            return null;
        }
    }
    segmentation() {
        let lingua = this.runLingua(this.seg, this.dataPath, "");
        if (lingua)
            return lingua.split("\r\n");
        else
            null;
    }
    runLingua(module, filename, options) {
        let object = child_process.spawnSync(this.scriptPath, [module, this.language, filename, (options) ? options : ""]);
        return object.stdout.toString();
    }
    createDataFile(text) {
        try {
            let _tagFile = paths_1.PATHS.__basedir +
                "\\" + "assets" + "\\" + "data" + "\\" + "tag_" + Date.now() + ".txt";
            fs.writeFileSync(_tagFile, text.trim());
            return _tagFile;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    deleteFile(filename) {
        fs.unlinkSync(filename);
    }
}
exports.Lingua = Lingua;
