import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedErrorPageComponent } from './pages/shared-error-page/shared-error-page.component';
import { SharedLayoutComponent } from './components/shared-layout/shared-layout.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    SharedErrorPageComponent,
    SharedLayoutComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [SharedLayoutComponent, CardComponent]
})
export class SharedModule { }
