"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const identifier_1 = require("./../lingua/identifier");
const lingua_1 = require("./../lingua/lingua");
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    static create(router) {
        console.log("[IndexRoute::create] Creating index route.");
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.title = "Home | Tour of Heros";
        let options = {
            "message": "Welcome to the Tour of Heros"
        };
        let sentences;
        let lingua = new lingua_1.Lingua('pt');
        lingua.segmentation("", (stdout) => {
            sentences = stdout.split("\r\n");
            console.log(sentences);
            let identifier = new identifier_1.Identifier(sentences);
            identifier.startIdentifying();
            console.log(identifier.getCandidates());
        });
    }
}
exports.IndexRoute = IndexRoute;
