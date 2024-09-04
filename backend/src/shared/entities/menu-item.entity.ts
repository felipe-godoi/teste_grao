import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity("menu_items")
export class MenuItem {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "ID do item de menu" })
    id: number;

    @Column()
    @ApiProperty({ description: "Nome do prato" })
    name: string;

    @Column("text")
    @ApiProperty({ description: "Descrição do prato" })
    description: string;

    @Column("decimal")
    @ApiProperty({ description: "Preço do prato" })
    price: number;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
    @ApiProperty({ description: "Restaurante ao qual o item pertence" })
    restaurant?: Restaurant;
}
