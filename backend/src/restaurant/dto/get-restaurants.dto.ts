import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetRestaurantsQueryDto {
    @ApiProperty({
        example: "carne",
        required: false,
        description:
            "Pesquisa por nome do restaurante, nome do prato ou descrição do prato",
        type: String,
    })
    @IsOptional()
    search?: string;
}
