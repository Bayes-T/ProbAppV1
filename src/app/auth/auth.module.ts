import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layout/atuh-layout/auth-layout.component';

import { AuthLoginPageComponent } from './pages/auth-login-page/auth-login-page.component';
import { AuthRegisterPageComponent } from './pages/auth-register-page/auth-register-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthLoginPageComponent,
    AuthRegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
