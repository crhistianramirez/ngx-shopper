import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
// import { TreeModule } from 'angular-tree-component'; // TODO: figure out angular-tree-component for SSR
import { ProductsRoutingModule } from 'src/app/product/product-routing.module';
import { ProductListComponent } from 'src/app/product/containers/product-list/product-list.component';
import { ProductDetailsComponent } from 'src/app/product/containers/product-details/product-details.component';
import { AdditionalImageGalleryComponent } from 'src/app/product/components/additional-image-gallery/additional-image-gallery.component';
import { PriceFilterComponent } from 'src/app/product/components/price-filter/price-filter.component';
import { CategoryNavComponent } from 'src/app/product/components/category-nav/category-nav.component';
import { SortFilterComponent } from 'src/app/product/components/sort-filter/sort-filter.component';
import { FacetFilterComponent } from 'src/app/product/components/facet-filter/facet-filter.component';
import { FacetListComponent } from 'src/app/product/components/facet-list/facet-list.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SpecFormComponent } from './components/spec-form/spec-form.component';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    // TreeModule, // TODO: figure out angular-tree-component for SSR
    NgxImageZoomModule,
  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    AdditionalImageGalleryComponent,
    PriceFilterComponent,
    CategoryNavComponent,
    SortFilterComponent,
    FacetFilterComponent,
    FacetListComponent,
    SpecFormComponent,
  ],
})
export class ProductsModule {}
