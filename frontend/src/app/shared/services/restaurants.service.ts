import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Restaurant } from "../interfaces/restaurants.type";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RestaurantsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRestaurants(search: string | null): Observable<Restaurant[]> {
    if (search) {
      return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`, {
        params: { search },
        withCredentials: true,
      });
    } else {
      return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`, {
        withCredentials: true,
      });
    }
  }

  getRestaurant(idRestaurant: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      `${this.apiUrl}/restaurants/${idRestaurant}`,
      { withCredentials: true }
    );
  }
}
