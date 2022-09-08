import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: {
        message,
      },
      duration: 3000,
    });
  }
}
