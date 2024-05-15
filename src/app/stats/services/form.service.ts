import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public isValid(form: FormGroup, field: string):boolean | null{
    return form.get(field)!.errors && form.get(field)!.touched
  }

  public getFieldError(form: FormGroup, field:string):string | null{

    const errors = form.controls[field].errors || {}
    
      for(const key of Object.keys(errors)) {
        switch(key){
          case 'required':
            return 'Este campo es requerido';
          case 'minlength':
            return 'Este campo debe tener mínimo 3 caracteres';
          default:
            return null 
        }
      
    }

    return null
  }
}
