import * as fs from "fs";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { MenuItem } from "../src/shared/entities/menu-item.entity";
import { Restaurant } from "../src/shared/entities/restaurant.entity";
import { User } from "../src/shared/entities/user.entity";

export default class InitSeeder implements Seeder {
    track = true;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const restaurantRepository = dataSource.getRepository(Restaurant);
        const menuItemRepository = dataSource.getRepository(MenuItem);
        const userRepository = dataSource.getRepository(User);

        const restaurantRawData = fs.readFileSync(
            "./data/restaurants.json",
            "utf8"
        );
        const restaurantData = JSON.parse(restaurantRawData);

        const menuItemRawData = fs.readFileSync(
            "./data/menu-items.json",
            "utf8"
        );
        const menuItemData = JSON.parse(menuItemRawData);

        for (const restaurantInfo of restaurantData) {
            const restaurant = new Restaurant();
            restaurant.name = restaurantInfo.name;
            restaurant.category = restaurantInfo.category;
            restaurant.phone = restaurantInfo.phone;
            restaurant.address = restaurantInfo.address;

            await restaurantRepository.save(restaurant);
        }

        for (const menuItemInfo of menuItemData) {
            const restaurant = await restaurantRepository.findOne({
                where: { id: menuItemInfo.restaurantId },
            });

            const menuItem = new MenuItem();
            menuItem.name = menuItemInfo.name;
            menuItem.description = menuItemInfo.description;
            menuItem.price = menuItemInfo.price;
            menuItem.restaurant = restaurant;

            await menuItemRepository.save(menuItem);
        }

        const user = new User();
        user.email = "fred@graodireto.com.br";
        await user.setPassword("123Fred");

        await userRepository.save(user);
    }
}
