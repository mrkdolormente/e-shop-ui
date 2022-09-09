import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isLoggedInSubscription: Subscription;

  constructor(
    public readonly authService: AuthService,
    public readonly cartService: CartService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * @description Open login popup
   */
  openLoginDialog(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/cart']);
      } else {
        this.dialog.open(LoginDialogComponent);
      }

      if (this.isLoggedInSubscription) this.isLoggedInSubscription.unsubscribe();
    });
  }
}
