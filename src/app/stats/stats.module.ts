import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { StatsRoutingModule } from './stats-routing.module';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { StatsLayoutComponent } from './layout/stats-layout/stats-layout.component';
import { StatListPageComponent } from './pages/stat-list-page/stat-list-page.component';
import { StatDetailPageComponent } from './pages/stat-detail-page/stat-detail-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { InstPipe } from './pipes/inst.pipe';
import { TopicsPipe } from './pipes/topics.pipe';
import { StatAddPageComponent } from './pages/stat-add-page/stat-add-page.component';
import { DialogUpdateComponent } from './components/dialog_update/dialog_update';


@NgModule({
  declarations: [
    StatCardComponent,
    StatsLayoutComponent,
    StatListPageComponent,
    StatDetailPageComponent,
    InstPipe,
    TopicsPipe,
    StatAddPageComponent,
    DialogUpdateComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class StatsModule { }
