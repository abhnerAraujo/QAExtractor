import { Extractor } from './../lingua/extractor';
import { OPERATIONS } from './../utils/array.operations';
import { Identifier } from './../lingua/identifier';
import { Lingua } from './../lingua/lingua';
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {

    let sentences;
    let lingua: Lingua = new Lingua('pt');
    sentences = lingua.segmentation();
    sentences = OPERATIONS.clearEmpty(sentences);
    let identifier: Identifier = new Identifier(sentences);
    if(identifier.startIdentifying()){
      let candidateSenteces = identifier.getCandidates();
      let extractor = new Extractor(candidateSenteces)
      extractor.startExtracting();
      res.send({data:extractor.getExtractedQuestions()});
    }
    res.send({text:"false"});
      // console.log(identifier.getCandidates());
  }
}