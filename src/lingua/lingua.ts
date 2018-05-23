import { PATHS } from './../constants/paths';
import { dirname } from 'path';
import * as child_process from 'child_process'
import * as fs from 'fs'

// const fs = require('fs');

export class Lingua {

    dataPath: string = 
        "C:/Users/abhne/Documents/tcc/projeto/QAExtractor/assets/data/data.txt"

    private scriptPath: string = PATHS.linguakit
    private language: string = 'pt';
    
    private tag: string = 'tagger';
    private seg: string = "seg";

    constructor(language:string) {
        this.language = language;
    }

    public tagger(text): Array<string>{
        let fileName = this.createDataFile(text);
        let result = ""
        let lingua = []
        if(fileName){
            result = this.runLingua(this.tag, fileName, "-nec")
            this.deleteFile(fileName);
            if(result && result.length > 0){
                lingua = result.split("\r\n");
                return lingua;
            }
        } else{
            return null;
        }

        // this.deleteFile(fileName);
    }

    public segmentation():Array<string>{
        let lingua = this.runLingua(this.seg, this.dataPath, "");
        if(lingua) return lingua.split("\r\n");
        else null;
    }

    private runLingua(module, filename, options):string{
        let object = child_process.spawnSync(
            this.scriptPath, 
            [module,this.language,filename,(options)? options : ""]);
        return object.stdout.toString();
    }

    createDataFile(text:string):string{
        try{
            let _tagFile = 
                    PATHS.__basedir + 
                    "\\"+"assets"+"\\"+"data"+"\\"+"tag_" + Date.now() + ".txt";
            
            fs.writeFileSync(_tagFile, text.trim());
            return _tagFile;

        }catch(err){
            console.log(err);
            return null;
        }
    }

    deleteFile(filename:string){
        fs.unlinkSync(filename)
    }


}