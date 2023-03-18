const request = require("supertest");

const mongo = require("../config/mongo");
const app = require("../app");

const routes = {
    REGISTER_ENDPOINT: {
        route: "/api/v1/users/register",
        methode: "POST",
        needAuth: false,
    },
    LOGIN_ENDPOINT: {
        route: "/api/v1/users/login",
        methode: "POST",
        needAuth: false,
    },
    PROFILE_ENDPOINT: {
        route: "/api/v1/users",
        methode: "GET",
        needAuth: true,
    },
    DELETE_ENDPOINT: {
        route: "/api/v1/users",
        methode: "DELETE",
        needAuth: true,
    },
};

const testUser = {
    email: "test.user@gmail.com",
    password: "testUser1234@@",
};

/* -------------------------------------------------------------------------- */
/*                               MAIN AUTH TEST                               */
/* -------------------------------------------------------------------------- */
describe("Testing main auth", () => {
    let userToken;

    beforeAll(async () => {
        await mongo.connect();
    });

    afterAll(() => {
        mongo.disconnect();
    });

    test("🧪 Server should be alive", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

    test("🧪 Register new user", async () => {
        const response = await request(app)
            .post(routes.REGISTER_ENDPOINT.route)
            .send(testUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.data.user.email).toBe(testUser.email);
    });

    test("🧪 Login with valid credentials", async () => {
        const response = await request(app)
            .post(routes.LOGIN_ENDPOINT.route)
            .send(testUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.token).toBeTruthy();
        userToken = response.body.data.token;
    });

    test("🧪 Get user profile with valid token", async () => {
        const response = await request(app)
            .get(routes.PROFILE_ENDPOINT.route)
            .set("Authorization", `${userToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.user.email).toBe(testUser.email);
    });

    test("🧪 Get user profile with invalid token", async () => {
        const response = await request(app)
            .get(routes.PROFILE_ENDPOINT.route)
            .set("Authorization", "Bearer invalid.token");
        expect(response.statusCode).toBe(401);
    });

    test("🧪 Delete user with valid token", async () => {
        const response = await request(app)
            .delete(routes.DELETE_ENDPOINT.route)
            .set("Authorization", `${userToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.message).toBeTruthy();
    });

    test("🧪 Delete user with invalid token", async () => {
        const response = await request(app)
            .delete(routes.DELETE_ENDPOINT.route)
            .set("Authorization", "Bearer invalid.token");
        expect(response.statusCode).toBe(401);
    });
});
