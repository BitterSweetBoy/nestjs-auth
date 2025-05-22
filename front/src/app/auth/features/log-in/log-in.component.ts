import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';

interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-log-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styles: ``
})
export default class LogInComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<LogInForm>({
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),  
      password: this.fb.nonNullable.control('', Validators.required)
    });
  }

  onSubmit(){
    if(this.form.invalid) return;
    const {email, password} = this.form.getRawValue();
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
