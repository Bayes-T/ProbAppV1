import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeAboutPageComponent } from './pages/home-about-page/home-about-page.component';
import { HomeBlogPageComponent } from './pages/home-blog-page/home-blog-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomePageComponent,
    HomeAboutPageComponent,
    HomeBlogPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
