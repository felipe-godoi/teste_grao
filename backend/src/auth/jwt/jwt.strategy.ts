import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { configService } from "src/shared/services/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: JwtStrategy.extractJwtFromCookie,
            secretOrKey: configService.getEnv("JWT_SECRET"),
        });
    }

    private static extractJwtFromCookie(req: Request): string | null {
        if (req && req.cookies) {
            return req.cookies["access_token"];
        }
        return null;
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
