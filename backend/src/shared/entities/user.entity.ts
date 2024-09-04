import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "ID do usuário" })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ description: "E-mail do usuário" })
    @IsEmail()
    email: string;

    @Column({ select: false, nullable: true })
    @ApiProperty({ description: "Senha criptografada do usuário" })
    password: string;

    async setPassword(password: string) {
        this.password = await bcrypt.hash(password, 10);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
