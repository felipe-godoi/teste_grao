import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { finalize } from "rxjs";
import { NgxLoadingModule } from "ngx-loading";
import { LoadingService } from "../../shared/services/loading.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxLoadingModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  isLogin: WritableSignal<boolean> = signal(true);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/restaurants"]);
    }
  }

  toggleMode() {
    this.isLogin.update((value) => !value);
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.get("email")!.value;
    const password = this.loginForm.get("password")!.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.toastrService.success("Login efetuado com sucesso!");
        return this.router.navigate(["/restaurants"]);
      },
    });
  }
}
