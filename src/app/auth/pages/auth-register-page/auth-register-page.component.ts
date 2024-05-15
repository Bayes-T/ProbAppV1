import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../interfaces/atuh.interfaces';
import { AuthService } from '../../services/auth.service';
import { AuthValidationService } from '../../services/auth-validation.service';
import { map } from 'rxjs';
import { EmailValidatorService } from '../../services/email-validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register-page',
  templateUrl: './auth-register-page.component.html',
  styleUrls: ['./auth-register-page.component.css']
})
export class AuthRegisterPageComponent implements OnInit{


  constructor(private fb:FormBuilder, private authService: AuthService, private router:Router, private validationService: AuthValidationService, public emailValidator: EmailValidatorService){}
  ngOnInit(): void {
    // this.userForm.controls['education'].setValue('your value or')
  }

  public userForm = this.fb.group({
    email: ["", [Validators.required, Validators.minLength(3)], [this.emailValidator]],
    name: ["", [Validators.required, Validators.minLength(3)], []],
    education: ["Selecciona tu nivel de estudios", [Validators.required, Validators.minLength(3)], []],
    password1: ["", [Validators.required, Validators.minLength(3)], []],
    password2:["", [Validators.required, Validators.minLength(3)], []],
  },

  {
    validators: [
      this.validationService.areEqual('password1', 'password2')
    ]}
)
 

    get newUser(){
      return this.userForm.value as User
    }

  public isValid(field:string){
    return this.validationService.isValidField(this.userForm, field)
  }

  public getFieldError(field:string){
    return this.validationService.getFieldError(this.userForm, field)
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

  public onSave(){
    if(!this.userForm.valid) return
    this.newUser.index = uuidv4()
    this.authService.registerUser(this.newUser).subscribe()

    this.userForm.reset()
    this.router.navigateByUrl('/stats/list')
  }
}
