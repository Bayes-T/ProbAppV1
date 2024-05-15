import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {

  constructor() { }

  //Mostrar errores síncronos
  public isValidField(form: FormGroup, field:string):boolean | null{

    return form.controls[field].errors && form.controls[field].touched
  }

  getFieldError(form:FormGroup, field:string):string | null {
    
    const errors = form.controls[field].errors || {}

    if(Object.values(form.controls['name'].errors || {}).includes('pattern')){
      errors['pattern'] = 'patternName'
    }
    for (const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return "Este campo es requerido"
        case 'minlength':
          return "Mínimo 3 caracteres"  
        case 'notEqual':
          return "Las contraseñas deben ser iguales"  
        case 'emailExist':  
        return 'Este email ya está siendo usado'
        default:
          return null
      }
    }

    return null
  }

  //Validaciones síncronas
  areEqual(formControl1:string, formControl2:string){

    return (form:FormGroup):ValidationErrors |null => {
    const value1 = form.get(formControl1)?.value
    const value2 = form.get(formControl2)?.value

    if(value1 !== value2 && form.get(formControl2)?.touched) {
      form.get(formControl2)?.setErrors({'notEqual':'true'})
      return {'notEqual':'true'}
    } else {
      form.get(formControl2)?.setErrors(null)
      return null
    }
  }
}


}
