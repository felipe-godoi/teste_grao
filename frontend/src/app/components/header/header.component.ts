import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MatIconButton, MatMenuModule, MatIconModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(["/login"]);
      },
    });
  }

  goToHome() {
    this.router.navigate(["/"]);
  }
}
