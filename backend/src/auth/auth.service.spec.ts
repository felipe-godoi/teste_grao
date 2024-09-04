import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../shared/entities/user.entity";
import { AuthService } from "./auth.service";

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe("AuthService", () => {
    let service: AuthService;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        save: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);

        jest.clearAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should register user and hash its password before save", async () => {
        const hashSpy = jest.spyOn(bcrypt, "hash");
        const repoSpy = jest.spyOn(service["userRepository"], "save");

        const result = await service.register({
            email: "teste@email.com",
            password: "123",
        });

        expect(result).toEqual({ email: "teste@email.com" });
        expect(hashSpy).toHaveBeenCalledTimes(1);
        expect(repoSpy).toHaveBeenCalledTimes(1);
    });

    it("should login user and return accessToken when its valid", async () => {
        const compareSpy = jest
            .spyOn(bcrypt, "compare")
            .mockResolvedValue(true);
        const jwtSpy = jest.spyOn(service["jwtService"], "sign");

        const expectedUser = new User();
        expectedUser.id = 1;
        expectedUser.email = "teste@email.com";
        expectedUser.password = "hashedPassword";
        service["userRepository"].findOne = jest
            .fn()
            .mockResolvedValue(expectedUser);

        const result = await service.login({
            email: "teste@email.com",
            password: "123",
        });

        expect(result).toHaveProperty("accessToken");
        expect(compareSpy).toHaveBeenCalledTimes(1);
        expect(jwtSpy).toHaveBeenCalledTimes(1);
    });

    it("should login user and return error when its invalid", async () => {
        const compareSpy = jest
            .spyOn(bcrypt, "compare")
            .mockResolvedValue(false);
        const jwtSpy = jest.spyOn(service["jwtService"], "sign");

        const expectedUser = new User();
        expectedUser.id = 1;
        expectedUser.email = "teste@email.com";
        expectedUser.password = "hashedPassword";
        service["userRepository"].findOne = jest
            .fn()
            .mockResolvedValue(expectedUser);

        const result = () =>
            service.login({
                email: "teste@email.com",
                password: "123",
            });

        await expect(result).rejects.toThrow(
            new UnauthorizedException("Credenciais inválidas")
        );
        expect(compareSpy).toHaveBeenCalledTimes(1);
        expect(jwtSpy).toHaveBeenCalledTimes(0);
    });
});
