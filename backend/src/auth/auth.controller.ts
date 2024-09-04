import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { LoginDto } from "../shared/dto/login.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @ApiOperation({ summary: "Registrar um novo usuário" })
    async register(@Body() registerDto: LoginDto) {
        return this.authService.register(registerDto);
    }

    @Post("login")
    @ApiOperation({ summary: "Autenticar um usuário" })
    @ApiResponse({
        status: 200,
        description:
            "Login bem-sucedido. O token JWT será definido como um cookie HTTP.",
    })
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const { accessToken } = await this.authService.login(loginDto);

        res.cookie("access_token", accessToken, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
        });

        return res
            .status(HttpStatus.OK)
            .json({ message: "Login bem-sucedido" });
    }

    @Post("logout")
    @ApiOperation({ summary: "Logout e limpar cookies de autenticação" })
    @ApiResponse({
        status: 200,
        description: "Logout bem-sucedido e cookie limpo.",
    })
    async logout(@Res() res: Response) {
        res.clearCookie("access_token");
        return res
            .status(HttpStatus.OK)
            .json({ message: "Logout bem-sucedido." });
    }
}
