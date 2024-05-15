import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthValidationService } from '../../services/auth-validation.service';
import { loginInterface } from '../../interfaces/atuh.interfaces';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  styleUrls: ['./auth-login-page.component.css']
})
export class AuthLoginPageComponent {

  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService, private authValidation: AuthValidationService){}

  public loginForm = this.fb.group({
    email: ["", [Validators.required], []],
    password1: ["", [Validators.required, Validators.minLength(6)], []]
  })

  get loginUser(){
    return this.loginForm.value as loginInterface
  } 

  //enviar la data
  onRecievingResults(value:loginInterface){
    this.authService.saveData(value);
  }

  log(){
    //lo que se ejecuta es un savedata con los valores de payload, pero aquí no tengo el currentUser...
    this.onRecievingResults(this.loginUser)
    //este metodo retorna un user y un token
    //toda la info esta en login user. como hacer para que solo envie si paso la autenticación??? -- directamente aca o con observables?? y con input o con service?

    this.router.navigateByUrl('/stats/list')
  }

} 
