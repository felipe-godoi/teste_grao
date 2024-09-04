import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { User } from "../shared/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe("AuthController", () => {
    let controller: AuthController;
    let service: AuthService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn(),
                        register: jest.fn(),
                        logout: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return access token on cookies when login is valid", async () => {
        const result = [];
        const body = {
            email: "email@email.com",
            password: "password",
        };
        const mockResponse = {
            cookie: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue({
                message: "Login bem-sucedido.",
            }),
        } as unknown as Response;

        const cookieSpy = jest.spyOn(mockResponse, "cookie");

        const serviceSpy = jest
            .spyOn(service, "login")
            .mockResolvedValue({ accessToken: "accessToken" });

        const response = await controller.login(body, mockResponse);

        expect(response).toStrictEqual({
            message: "Login bem-sucedido.",
        });
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(body);
        expect(cookieSpy).toHaveBeenCalledTimes(1);
        expect(cookieSpy).toHaveBeenCalledWith("access_token", "accessToken", {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
        });
    });

    it("should clear cookies when logout is called", async () => {
        const mockResponse = {
            clearCookie: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue({
                message: "Logout bem-sucedido.",
            }),
        } as unknown as Response;

        const cookieSpy = jest.spyOn(mockResponse, "clearCookie");

        const response = await controller.logout(mockResponse);

        expect(response).toStrictEqual({
            message: "Logout bem-sucedido.",
        });
        expect(cookieSpy).toHaveBeenCalledTimes(1);
        expect(cookieSpy).toHaveBeenCalledWith("access_token");
    });

    it("should register a new user", async () => {
        const result = new User();
        result.email = "email@email.com";

        const body = {
            email: "email@email.com",
            password: "password",
        };

        const serviceSpy = jest
            .spyOn(service, "register")
            .mockResolvedValue(result);

        const response = await controller.register(body);

        expect(response).toStrictEqual(result);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
    });
});
