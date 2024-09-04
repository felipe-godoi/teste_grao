import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto } from "../shared/dto/login.dto";
import { User } from "../shared/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(registerDto: LoginDto): Promise<User> {
        const user = new User();
        user.email = registerDto.email;
        await user.setPassword(registerDto.password);

        this.userRepository.save(user);

        return { email: user.email } as User;
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
            select: ["password"],
        });

        if (user && (await user.validatePassword(loginDto.password))) {
            const payload = { email: user.email, sub: user.id };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException("Credenciais inválidas");
        }
    }
}
