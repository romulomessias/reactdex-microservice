import { BaseHttpController, controller, httpGet, interfaces } from "inversify-express-utils";
import UserService from "./UserService";
import { inject } from "inversify";
import {ApiPath, ApiOperationGet, SwaggerDefinitionConstant} from "swagger-express-ts";

@ApiPath({
    path: "/users",
    name: "Users",
})
@controller("/users")
export default class UserController extends BaseHttpController {
    public static TARGET_NAME: string = "UserController";

    constructor( @inject("UserService") private userService: UserService ) {
        super();
    }

    @ApiOperationGet({
        path: '/websites',
        description: "Get All User's Websites",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY}
        }
    })
    @httpGet("/websites")
    async getAllWebsites() {
        try {
            const websites = await this.userService.getAllWebsites();
            return this.json(websites, 200)
        } catch (e) {
            return this.internalServerError(e)
        }
    }

    @ApiOperationGet({
        path: '/filtered',
        description: "Get All User's thar address contain \'suite\' word",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY}
        }
    })
    @httpGet("/filtered")
    async filterByAddress() {
        try {
            const users = await this.userService.filterByAddress('suite');
            return this.json(users, 200)
        } catch (e) {
            return this.internalServerError(e)
        }
    }

    @ApiOperationGet({
        path: '/compact',
        description: "Get a simplified user model",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY}
        }
    })
    @httpGet("/compact")
    async getAllUserCompactModel() {
        try {
            const users = await this.userService.getCompactModel();
            return this.json(users, 200)
        } catch (e) {
            return this.internalServerError(e)
        }
    }
}