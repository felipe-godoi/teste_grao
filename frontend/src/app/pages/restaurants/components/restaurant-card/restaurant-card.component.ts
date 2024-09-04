import { Component, input } from "@angular/core";
import { Restaurant } from "../../../../shared/interfaces/restaurants.type";
import { Router } from "@angular/router";

@Component({
  selector: "app-restaurant-card",
  standalone: true,
  imports: [],
  templateUrl: "./restaurant-card.component.html",
  styleUrl: "./restaurant-card.component.scss",
})
export class RestaurantCardComponent {
  restaurant = input.required<Restaurant>();

  constructor(private router: Router) {}

  openDetails() {
    this.router.navigate(["/restaurants", this.restaurant().id]);
  }
}
