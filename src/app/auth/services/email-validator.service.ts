import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber, delay, map } from 'rxjs';
import { User } from '../interfaces/atuh.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  //Peticiones asíncronas
  constructor(private http:HttpClient) { }

  public basicURL:string = "http://localhost:3000/user"
  
  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {

    const email = control.value 
  //creo que no es un callback, sino que dentro de la clase, el metodo validate retorna un nuevo observable
      return this.http.get<User>(`${this.basicURL}/${email}`)
    .pipe(
      //AQUI ESTABA EL PROBLEMA, SIEMPRE EN LAS REQUEST HAY QUE PONER UN CATCH ERROR!!!!!!!! AHORA PUEDO VALIDAR ASINCRONAMENTE
      //si no existe el email, me retorna false.... creo que es válido esto porque si no lo coloco estoy colocando como que siempre va a existir el email. Como que siempre va a haber respuesta. al colocarle que será false, la propiedad email puede ser undefined o null
      map(resp=> {
        return (resp?.email !== undefined || null? {emailExist: true} : null)
      })
    )
  }

}
