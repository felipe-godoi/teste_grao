import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuItem } from "./menu-item.entity";

@Entity("restaurants")
export class Restaurant {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "ID do restaurante" })
    id: number;

    @Column()
    @ApiProperty({ description: "Nome do restaurante" })
    name: string;

    @Column()
    @ApiProperty({ description: "Categoria do restaurante" })
    category: string;

    @Column()
    @ApiProperty({ description: "Telefone do restaurante" })
    phone: string;

    @Column()
    @ApiProperty({ description: "Endereço do restaurante" })
    address: string;

    @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant)
    @ApiProperty({
        type: () => [MenuItem],
        description: "Lista de itens do cardápio",
    })
    menuItems: MenuItem[];
}
