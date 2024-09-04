import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: "E-mail do usuário" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Senha do usuário" })
    @IsNotEmpty()
    password: string;
}
