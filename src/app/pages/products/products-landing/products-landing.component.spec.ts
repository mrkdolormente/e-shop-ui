import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsLandingComponent } from './products-landing.component';

describe('ProductsLandingComponent', () => {
  let component: ProductsLandingComponent;
  let fixture: ComponentFixture<ProductsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
