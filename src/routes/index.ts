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
    //set custom title
    this.title = "Home | Tour of Heros";

    //set options
    let options: Object = {
      "message": "Welcome to the Tour of Heros"
    };

    let sentences;
    let lingua: Lingua = new Lingua('pt');
    lingua.segmentation("", (stdout) => {
      sentences = stdout.split("\r\n")
      console.log(sentences)
      let identifier: Identifier = new Identifier(sentences);
      identifier.startIdentifying();
      console.log(identifier.getCandidates());
    })
    //render template
    // this.render(req, res, "index", options);
  }
}