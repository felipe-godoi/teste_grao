import {
    Body,
    ConflictException,
    Controller,
    HttpStatus,
    Post,
    Res,
} from "@nestjs/common";
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
    async register(@Body() registerDto: LoginDto, @Res() res: Response) {
        try {
            return await this.authService.register(registerDto);
        } catch (err) {
            if (err instanceof ConflictException) {
                return res.status(HttpStatus.CONFLICT).json({
                    message:
                        "Esse e-mail já está em uso. Se deseja fazer login, clique em 'Login'.",
                });
            }

            return res.status(HttpStatus.BAD_GATEWAY).json({
                message: "Erro ao registrar o usuário. ",
            });
        }
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
