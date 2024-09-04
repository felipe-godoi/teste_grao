import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, finalize, tap, throwError } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { ToastrService } from "ngx-toastr";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const toastr = inject(ToastrService);

  return next(req)
    .pipe(
      tap(() => {
        loadingService.loadingOn();
      })
    )
    .pipe(finalize(() => loadingService.loadingOff()))
    .pipe(
      catchError((error: HttpErrorResponse, response: any) => {
        if (error.status === 0) {
          toastr.error(
            "Servidor inacessível; por favor, tente novamente mais tarde"
          );
          console.error("Ocorreu um erro:", error.error);
        } else if (error.status === 401) {
          toastr.error("Você não tem permissão para acessar este recurso");
        } else {
          if (error.error.message) {
            toastr.error(error.error.message);
          } else {
            toastr.error(
              "Algo deu errado; por favor, tente novamente mais tarde"
            );
          }
          console.error(
            `Backend retornou código ${error.status}, ` +
              `body: ${JSON.stringify(error.error)}`
          );
        }

        return throwError(
          () =>
            new Error("Algo deu errado; por favor, tente novamente mais tarde.")
        );
      })
    );
};
