import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuItem } from "src/shared/entities/menu-item.entity";
import { Restaurant } from "src/shared/entities/restaurant.entity";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant, MenuItem])],
    controllers: [RestaurantController],
    providers: [RestaurantService],
})
export class RestaurantModule {}
