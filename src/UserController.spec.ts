import 'reflect-metadata';
import UserController from "./UserController";
import UserService from "./UserService";
import { results } from "inversify-express-utils";

describe("GET /users", () => {
    let controller: UserController;

    beforeEach(() => {
        controller = new UserController(new UserService());
    });

    it("get all websites", async () => {
        return  controller.getAllWebsites().then( response => {
            //@ts-ignore
            expect(response.statusCode).toBe(200);
        })
    });
    
    it("get all User's thar address contain 'suite' word", async () => {
        return  controller.filterByAddress().then( response => {
            //@ts-ignore
            expect(response.statusCode).toBe(200);
        })
    });

    it("get a simplified user model", async () => {
        return  controller.getAllUserCompactModel().then( response => {
            //@ts-ignore
            expect(response.statusCode).toBe(200);
        })
    });
});
