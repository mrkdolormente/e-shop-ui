import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { first, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  private readonly destroy$ = new Subject();

  constructor(
    public readonly authService: AuthService,
    public cartService: CartService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.pipe(first()).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.cartService
          .getCartItemList()
          .pipe(takeUntil(this.destroy$))
          .subscribe((cartItemList) => {
            this.cartService.itemCount = cartItemList.length || 0;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * @description Open login popup
   */
  openLoginDialog(): void {
    this.authService.isLoggedIn.pipe(first()).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/cart']);
      } else {
        this.dialog.open(LoginDialogComponent);
      }
    });
  }
}
