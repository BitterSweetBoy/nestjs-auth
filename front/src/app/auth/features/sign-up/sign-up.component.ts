import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export default class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: this.fb.nonNullable.control('', Validators.required),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { name, email, password } = this.form.getRawValue();
    this.authService.signUp(name, email, password).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
