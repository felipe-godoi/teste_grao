import { Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { RestaurantsComponent } from "./pages/restaurants/restaurants.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RestaurantDetailComponent } from "./pages/restaurant-detail/restaurant-detail.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "restaurants",
    pathMatch: "full",
  },
  {
    path: "restaurants",
    component: RestaurantsComponent,
    canActivate: [authGuard],
  },
  {
    path: "restaurants/:id",
    component: RestaurantDetailComponent,
    canActivate: [authGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "/" },
];
