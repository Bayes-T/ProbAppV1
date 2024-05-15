import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/atuh-layout/auth-layout.component';
import { AuthLoginPageComponent } from './pages/auth-login-page/auth-login-page.component';
import { AuthRegisterPageComponent } from './pages/auth-register-page/auth-register-page.component';


const routes: Routes = [
  {path: '',
  component: AuthLayoutComponent,
  children: [
    {path: 'login',
    component: AuthLoginPageComponent},
    {path: 'register',
    component: AuthRegisterPageComponent},
    {path: '**',
    redirectTo: 'login'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
