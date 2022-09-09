import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnDestroy {
  showPassword: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isSubmitting: boolean = false;
  isInvalidCredentials: boolean = false;

  private readonly destroy$ = new Subject();

  /**
   * @description Get the email form control
   * @returns AbscractControl
   */
  get emailFormControl() {
    return this.loginForm.get('email');
  }

  /**
   * @description Get the password form control
   * @returns AbscractControl
   */
  get passwordFormControl() {
    return this.loginForm.get('password');
  }

  constructor(
    private readonly authService: AuthService,
    private readonly dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * @description Close login popup
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * @description Submit login form
   */
  onSubmit() {
    // Check if login form is valid
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.isInvalidCredentials = false;

      this.authService
        .login({
          email: String(this.emailFormControl?.value),
          password: String(this.passwordFormControl?.value),
        })
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe({
          next: (tokenData) => {
            // Close dialog upon success request
            this.dialogRef.close();

            // Save auth token
            this.authService.saveAuthToken(tokenData.token);
          },
          error: (err) => {
            this.isInvalidCredentials = true;
          },
        });
    }
  }
}
