import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, finalize, tap, throwError } from "rxjs";
import { LoadingService } from "../services/loading.service";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  return next(req)
    .pipe(
      tap(() => {
        loadingService.loadingOn();
      })
    )
    .pipe(finalize(() => loadingService.loadingOff()))
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          console.error("Ocorreu um erro:", error.error);
        } else {
          console.error(
            `Backend retornou código ${error.status}, ` +
              `body era: ${error.error}`
          );
        }

        return throwError(
          () =>
            new Error("Algo deu errado; por favor, tente novamente mais tarde.")
        );
      })
    );
};
