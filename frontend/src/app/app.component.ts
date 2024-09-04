import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { AuthService } from "./auth/auth.service";
import { NgxLoadingModule } from "ngx-loading";
import { LoadingService } from "./shared/services/loading.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterOutlet, NgxLoadingModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "frontend";
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading.set(loading);
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
