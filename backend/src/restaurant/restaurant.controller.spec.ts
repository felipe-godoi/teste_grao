import { Test, TestingModule } from "@nestjs/testing";
import { Restaurant } from "../shared/entities/restaurant.entity";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";

describe("RestaurantController", () => {
    let controller: RestaurantController;
    let service: RestaurantService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RestaurantController],
            providers: [
                {
                    provide: RestaurantService,
                    useValue: {
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<RestaurantController>(RestaurantController);
        service = module.get<RestaurantService>(RestaurantService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all restaurants", async () => {
        const result = [];
        const query = {};

        const serviceSpy = jest
            .spyOn(service, "findAll")
            .mockResolvedValue(result);

        expect(await controller.getRestaurants(query)).toBe(result);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(undefined);
    });

    it("should return restaurants according to query", async () => {
        const result = [];
        const query = {
            search: "query",
        };

        const serviceSpy = jest
            .spyOn(service, "findAll")
            .mockResolvedValue(result);

        expect(await controller.getRestaurants(query)).toBe(result);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith("query");
    });

    it("should return one restaurant according to id", async () => {
        const result = new Restaurant();
        const params = 1;

        const serviceSpy = jest
            .spyOn(service, "findOne")
            .mockResolvedValue(result);

        expect(await controller.getRestaurant(params)).toBe(result);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(1);
    });
});
