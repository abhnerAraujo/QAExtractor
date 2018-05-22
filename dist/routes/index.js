"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractor_1 = require("./../lingua/extractor");
const array_operations_1 = require("./../utils/array.operations");
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
        let sentences;
        let lingua = new lingua_1.Lingua('pt');
        sentences = lingua.segmentation();
        sentences = array_operations_1.OPERATIONS.clearEmpty(sentences);
        let identifier = new identifier_1.Identifier(sentences);
        if (identifier.startIdentifying()) {
            let candidateSenteces = identifier.getCandidates();
            let extractor = new extractor_1.Extractor(candidateSenteces);
            extractor.startExtracting();
        }
        res.send({ text: "true" });
    }
}
exports.IndexRoute = IndexRoute;
