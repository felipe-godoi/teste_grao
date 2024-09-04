import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { configService } from "./shared/services/config.service";

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        RestaurantModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
