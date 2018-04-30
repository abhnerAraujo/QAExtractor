const child_process = require('child_process');

export class Lingua {

    dataPath: string = 
        "C:/Users/abhne/Documents/tcc/projeto/QAExtractor/dist/assets/data/data.txt"

    private scriptPath: string = 
        'C:/Users/abhne/Documents/tcc/projeto/QAExtractor/dist/assets/Linguakit/linguakit.bat'
    private language: string = 'pt';
    
    private tagger: string = 'tagger';
    private seg: string = "seg";

    constructor(language:string) {}

    segmentation(path: string, callback){
        let i = 0;
        child_process.exec(
            this.scriptPath + 
            " " +  this.seg +
            " " + this.language +
            " " + this.dataPath, 
            (error, stdout, stderr) => {
                if(error) {
                    console.log(error)
                } else {
                    callback(stdout)
                }
            })
    }


}