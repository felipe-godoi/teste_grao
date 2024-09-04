import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Restaurant } from "../shared/entities/restaurant.entity";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>
    ) {}

    async findAll(search?: string): Promise<Restaurant[]> {
        if (search) {
            return this.restaurantRepository.find({
                where: [
                    { name: ILike(`%${search}%`) },
                    { category: ILike(`%${search}%`) },
                    { menuItems: { name: ILike(`%${search}%`) } },
                    { menuItems: { description: ILike(`%${search}%`) } },
                ],
            });
        }
        return this.restaurantRepository.find();
    }

    async findOne(id: number): Promise<Restaurant> {
        return this.restaurantRepository.findOne({
            where: { id },
            relations: ["menuItems"],
        });
    }
}
