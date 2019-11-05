import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from 'src/app/layout/header/header.component';
import { MainComponent } from 'src/app/layout/main/main.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

import { SharedModule } from 'src/app/shared';
import { HomeComponent } from 'src/app/layout/home/home.component';

@NgModule({
  imports: [RouterModule, SharedModule],
  exports: [HeaderComponent, MainComponent, FooterComponent, HomeComponent],
  declarations: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
  ],
})
export class LayoutModule {}
