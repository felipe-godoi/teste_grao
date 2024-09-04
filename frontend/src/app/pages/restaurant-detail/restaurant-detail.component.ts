import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Restaurant } from "../../shared/interfaces/restaurants.type";
import { RestaurantsService } from "../../shared/services/restaurants.service";
import { CommonModule } from "@angular/common";
import { DetailCardComponent } from "./components/detail-card/detail-card.component";

@Component({
  selector: "app-restaurant-detail",
  standalone: true,
  imports: [CommonModule, DetailCardComponent],
  templateUrl: "./restaurant-detail.component.html",
  styleUrl: "./restaurant-detail.component.scss",
})
export class RestaurantDetailComponent {
  restaurant?: Restaurant;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService
  ) {}

  ngOnInit() {
    const idRestaurant = Number(
      this.activatedRoute.snapshot.paramMap.get("id")
    );

    if (idRestaurant) {
      this.restaurantService.getRestaurant(idRestaurant).subscribe({
        next: (restaurant) => {
          this.restaurant = restaurant;
          console.log(restaurant);
        },
      });
    }
  }
}
