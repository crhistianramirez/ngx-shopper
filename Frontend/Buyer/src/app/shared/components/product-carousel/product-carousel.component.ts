import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { BuyerProduct } from '@ordercloud/angular-sdk';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent {
  @Input() products: BuyerProduct[];
  @Input() displayTitle: string;

  index = 0;
  rowLength = 4;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.configureRouter();
  }

  left(): void {
    this.index -= this.rowLength;
  }

  right(): void {
    this.index += this.rowLength;
  }

  getProducts(): BuyerProduct[] {
    return this.products.slice(this.index, this.index + this.rowLength);
  }

  configureRouter() {
    /**
     *
     * override angular's default routing behavior so that
     * going to the same route with different query params are
     * detected as a state change.
     *
     */
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
