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

      // Cross Origin Resource Sharing Options
      cors: {
        // origin handler
        origin: function (origin, cb) {
          // setup a white list
          let wl = ["https://reactdex-microservice.herokuapp.com", "http://localhost:3000"];

          if (wl.indexOf(origin) != -1) {
            cb(null, true);
          } else {
            cb(new Error("invalid origin: " + origin), false);
          }
        },

        optionsSuccessStatus: 200,
      },
    };
    app.use(conf.originUndefined, cors(conf.cors));
    app.use("/", express.static("swagger"));
    app.use(
      "/api-docs/swagger/assets",
      express.static("node_modules/swagger-ui-dist")
    );
    app.use(bodyParser.json());
    app.use(
      swagger.express({
        definition: {
          info: {
            title: "Simple API",
            version: "1.0",
          },
        },
      })
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  }

  private static instance: App | undefined = undefined;
  static start() {
    if (this.instance == undefined) {
      this.instance = new App();
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
