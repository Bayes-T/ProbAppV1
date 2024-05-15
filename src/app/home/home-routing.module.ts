import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeAboutPageComponent } from './pages/home-about-page/home-about-page.component';
import { HomeBlogPageComponent } from './pages/home-blog-page/home-blog-page.component';

const routes: Routes = [
  {path: '',
  component: HomeLayoutComponent,
  children: [
    {path: 'landing',
    component: HomePageComponent},
    {path: 'about',
    component: HomeAboutPageComponent},
    {path: 'blog',
    component: HomeBlogPageComponent},
    {path: '**',
    redirectTo: 'landing'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
