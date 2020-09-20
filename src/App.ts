import "reflect-metadata";
import { Application, NextFunction, Request, Response } from "express";
import { interfaces, InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import UserController from "./UserController";
import UserService from "./UserService";
import * as express from "express";
import bodyParser = require("body-parser");
import cors = require ("cors");
import * as swagger from "swagger-express-ts";

export default class App {
  public expressApp: Application;

  private constructor() {
    const inversifyExpressServer = this.initServer();
    this.expressApp = inversifyExpressServer.build();
  }

  private initServer(): InversifyExpressServer {
    const container = new Container();

    container.bind<UserService>("UserService").to(UserService);
    container
      .bind<interfaces.Controller>("UserController")
      .to(UserController)
      .inSingletonScope()
      .whenTargetNamed(UserController.TARGET_NAME);

    const server = new InversifyExpressServer(container);

    server.setConfig(this.configApp);

    server.setErrorConfig((app: any) => {
      app.use(
        (
          err: Error,
          request: Request,
          response: Response,
          next: NextFunction
        ) => {
          console.error(err.stack);
          response.status(500).send("Something broke!");
        }
      );
    });

    return server;
  }

  private configApp(app: Application) {
    let conf = {
      port: process.env.PORT || 3000,

      // origin undefined handler
      // see https://github.com/expressjs/cors/issues/71
      originUndefined: function (req, res, next) {
        console.log(req.headers.origin)
        if (!req.headers.origin) {
          res.json({
            mess:
              "Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined",
          });
        } else {
          next();
        }
      },

        this.instance.expressApp.listen(process.env.PORT || 3000, () => {
          console.log(
            "Express server listening on port " + process.env.PORT || 3000
          );
        });
>>>>>>> parent of dbfd127... chore: updated port
    }

    this.instance.expressApp.listen(process.env.PORT || 3000, () => {
      console.log(
        "Express server listening on port " +
          (process.env.PORT || 3000) +
          " " +
          process.env.NODE_ENV
      );
    });
  }
}
