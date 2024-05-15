import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedErrorPageComponent } from './shared/pages/shared-error-page/shared-error-page.component';

const routes: Routes = [
  {path: 'home',
  loadChildren: () => import('./home/home.module').then (m => m.HomeModule)
  },
  {path: 'auth',
  loadChildren: () => import('./auth/auth.module').then (m => m.AuthModule)
  },
  {path: 'stats',
  loadChildren: () => import('./stats/stats.module').then (m => m.StatsModule)
  },
  {path: '404',
  component: SharedErrorPageComponent},
  {
    path: "",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
