import {
  Component,
  effect,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { RestaurantsService } from "../../shared/services/restaurants.service";
import { Restaurant } from "../../shared/interfaces/restaurants.type";
import { RestaurantCardComponent } from "./components/restaurant-card/restaurant-card.component";

@Component({
  selector: "app-restaurants",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    RestaurantCardComponent,
  ],
  templateUrl: "./restaurants.component.html",
  styleUrl: "./restaurants.component.scss",
})
export class RestaurantsComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl(""),
  });
  restaurants: WritableSignal<Restaurant[]> = signal([]);

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit(): void {
    this.searchForm
      .get("search")!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          return this.restaurantService.getRestaurants(term);
        })
      )
      .subscribe({
        next: (results) => {
          this.restaurants.set(results);

          console.log(this.restaurants());
        },
      });

    this.restaurantService.getRestaurants(null).subscribe({
      next: (results) => {
        this.restaurants.set(results);
      },
    });
  }
}
