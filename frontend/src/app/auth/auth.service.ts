import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";
import { RegisterResponse } from "../shared/interfaces/auth.type";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private cookieService: CookieService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          console.log("Login bem-sucedido");
        })
      );
  }

  register(email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, {
      email,
      password,
    });
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          console.log("Logout bem-sucedido");
        })
      );
  }

  isAuthenticated(): boolean {
    return this.cookieService.check("access_token");
  }
}
