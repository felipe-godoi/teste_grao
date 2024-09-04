import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Restaurant } from "../shared/entities/restaurant.entity";
import { RestaurantService } from "./restaurant.service";

const allRestaurants = [
    {
        id: 1,
        name: "Sabor Mineiro",
        category: "Mineira",
        phone: "(34) 3332-5678",
        address: "Rua Governador Valadares, 456, Centro, Uberaba - MG",
        menuItems: [
            {
                id: 1,
                name: "Feijão Tropeiro",
                description:
                    "Feijão misturado com farinha, bacon, linguiça, ovos e temperos mineiros.",
                price: 29,
            },
            {
                id: 2,
                name: "Frango com Quiabo",
                description:
                    "Frango cozido com quiabo e molho de tomate, acompanha arroz e angu.",
                price: 33,
            },
        ],
    },
    {
        id: 2,
        name: "Cantinho do Cerrado",
        category: "Carnes",
        phone: "(34) 3315-9876",
        address: "Avenida Leopoldino de Oliveira, 789, Mercês, Uberaba - MG",
        menuItems: [
            {
                id: 3,
                name: "Pequi com Frango",
                description: "Frango cozido com pequi, arroz e tutu de feijão.",
                price: 35,
            },
            {
                id: 4,
                name: "Pamonha",
                description:
                    "Tradicional pamonha mineira, feita com milho verde e queijo.",
                price: 13,
            },
            {
                id: 5,
                name: "Galinhada",
                description: "Arroz temperado com frango, açafrão e pequi.",
                price: 30,
            },
        ],
    },
];

describe("RestaurantService", () => {
    let service: RestaurantService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RestaurantService,
                {
                    provide: getRepositoryToken(Restaurant),
                    useValue: {
                        find: jest.fn().mockResolvedValue(allRestaurants),
                        findOne: jest.fn().mockResolvedValue(allRestaurants[0]),
                    },
                },
            ],
        }).compile();

        service = module.get<RestaurantService>(RestaurantService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should return all restaurants when search is empty", async () => {
        const repoSpy = jest.spyOn(service["restaurantRepository"], "find");

        const result = await service.findAll();

        expect(result).toEqual(allRestaurants);
        expect(repoSpy).toHaveBeenCalledTimes(1);
    });

    it("should return filtered restaurants when search is not empty", async () => {
        const filteredRestaurants = [
            {
                id: 1,
                name: "Sabor Mineiro",
                category: "Mineira",
                phone: "(34) 3332-5678",
                address: "Rua Governador Valadares, 456, Centro, Uberaba - MG",
                menuItems: [
                    {
                        id: 2,
                        name: "Frango com Quiabo",
                        description:
                            "Frango cozido com quiabo e molho de tomate, acompanha arroz e angu.",
                        price: 33,
                    },
                ],
            },
            {
                id: 2,
                name: "Cantinho do Cerrado",
                category: "Carnes",
                phone: "(34) 3315-9876",
                address:
                    "Avenida Leopoldino de Oliveira, 789, Mercês, Uberaba - MG",
                menuItems: [
                    {
                        id: 3,
                        name: "Pequi com Frango",
                        description:
                            "Frango cozido com pequi, arroz e tutu de feijão.",
                        price: 35,
                    },
                ],
            },
        ];

        const repoSpy = jest
            .spyOn(service["restaurantRepository"], "find")
            .mockResolvedValueOnce(filteredRestaurants);

        const result = await service.findAll("cozido");

        expect(result).toEqual(filteredRestaurants);
        expect(repoSpy).toHaveBeenCalledTimes(1);
    });

    it("should return one restaurant when search id is passed", async () => {
        const repoSpy = jest.spyOn(service["restaurantRepository"], "findOne");

        const result = await service.findOne(1);

        expect(result).toEqual(allRestaurants[0]);
        expect(repoSpy).toHaveBeenCalledTimes(1);
    });
});
