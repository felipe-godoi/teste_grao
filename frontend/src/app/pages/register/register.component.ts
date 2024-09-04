import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/restaurants"]);
    }
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const email = this.registerForm.get("email")!.value;
    const password = this.registerForm.get("password")!.value;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.router.navigate(["/login"]);
      },
    });
  }
}
