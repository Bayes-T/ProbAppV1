import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsLayoutComponent } from './layout/stats-layout/stats-layout.component';
import { StatDetailPageComponent } from './pages/stat-detail-page/stat-detail-page.component';
import { StatListPageComponent } from './pages/stat-list-page/stat-list-page.component';
import { StatAddPageComponent } from './pages/stat-add-page/stat-add-page.component';

const routes: Routes = [
  {
    path: '',
    component: StatsLayoutComponent,
    children: [
      {path: 'list',
       component: StatListPageComponent},
       {
        path: 'add',
        component: StatAddPageComponent
       },
       {
        path: ':id',
        component: StatDetailPageComponent
       },
       {
        path: '**',
        redirectTo: 'list'
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
