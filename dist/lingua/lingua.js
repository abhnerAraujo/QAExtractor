"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require('child_process');
class Lingua {
    constructor(language) {
        this.dataPath = "C:/Users/abhne/Documents/tcc/projeto/QAExtractor/dist/assets/data/data.txt";
        this.scriptPath = 'C:/Users/abhne/Documents/tcc/projeto/QAExtractor/dist/assets/Linguakit/linguakit.bat';
        this.language = 'pt';
        this.tagger = 'tagger';
        this.seg = "seg";
    }
    segmentation(path, callback) {
        let i = 0;
        child_process.exec(this.scriptPath +
            " " + this.seg +
            " " + this.language +
            " " + this.dataPath, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
            else {
                callback(stdout);
            }
        });
    }
}
exports.Lingua = Lingua;
