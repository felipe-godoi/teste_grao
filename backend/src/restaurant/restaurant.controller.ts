import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCookieAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { Restaurant } from "src/shared/entities/restaurant.entity";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { GetRestaurantsQueryDto } from "./dto/get-restaurants.dto";
import { RestaurantService } from "./restaurant.service";

@ApiTags("Restaurants")
@ApiBearerAuth()
@Controller("restaurants")
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: "Obter lista de restaurantes com filtro" })
    @ApiResponse({
        status: 200,
        description: "Lista de restaurantes",
        type: [Restaurant],
    })
    @ApiResponse({
        status: 401,
        description:
            "Não autorizado. Certifique-se de estar autenticado via cookie JWT.",
    })
    @ApiCookieAuth("access_token")
    async getRestaurants(@Query() query: GetRestaurantsQueryDto) {
        return this.restaurantService.findAll(query.search);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiOperation({ summary: "Obter detalhes de um restaurante" })
    @ApiResponse({
        status: 200,
        description: "Detalhamento de um restaurante",
        type: Restaurant,
    })
    @ApiResponse({
        status: 401,
        description:
            "Não autorizado. Certifique-se de estar autenticado via cookie JWT.",
    })
    @ApiCookieAuth("access_token")
    async getRestaurant(@Param("id") id: number) {
        return this.restaurantService.findOne(id);
    }
}
