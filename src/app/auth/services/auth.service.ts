import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, delay, map, of, switchMap, tap, throwError } from 'rxjs';
import { User, authStatus, checkTokenResponse, loginInterface, loginResponse } from '../interfaces/atuh.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  //SERVICIO PETICIONES
  
  constructor(private http:HttpClient, private router: Router)  {

    this.checkAuthentication().subscribe()
   }


  public baseURL:string = environment.basicURL

  //Peticiones http de user
  public basicURL:string = "http://localhost:3000/user"

  public currentUserAuth:User | null =  null
  public currentUser:User | null = null;
  public currentState:authStatus = authStatus.Cheking
  
  //RxJs del login
  //OJO CON EL TIPADO Y CON LO QUE ENVIO. EL MÉTODO LOGIN RETORNA UN BOOLEANO Y LO QUE QUIERO ENVIAR ES UN CURRENT USER... TENDRIA QUE TENER UN METODO QUE EMITA UN CURRENT USER? MODIFICAR EL EXISTENTE? COMO ANTES SI SIRVIO???
  private dataUserSource = new BehaviorSubject<User | null>(this.currentUser);
  //que tan necesario es este dataemitter?????? solo lo use una vez en el otro componente, Aunque con este se usa subscribe. Con el otro next. REPASAR TODO RXJS PARA SABER DIFERENCIAS Y CUANDO SE USAN
  dataEmitter = this.dataUserSource.asObservable();

  public saveData(value:loginInterface){
    this.loginUser(value).subscribe(() =>
        this.dataUserSource.next(this.currentUser)
    );
}

  
  public registerUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.basicURL}/register`, user)
  }


//Y La prop current user como que cada vez que recargo la página vuelve a su estado original. CREO QUE ESTO ES CON TOKEN, el bearer del guard  Y TAMBIEN VER LOGOUT.

  public loginUser(loginInterface: loginInterface | null){
    const url = `${this.basicURL}/login`
    const body = {email: loginInterface?.email, password1: loginInterface?.password1}
    return this.http.post<loginResponse>(url, body)
    .pipe(
      map(({user, token}) => this.setAuthentication(token, user)),
    catchError(err => throwError(() => err.error.message))
    )
  }

  //no es el mismo dos veces, aqui defino el usuario y que está autenticado si sale todo bien
  private setAuthentication( token:string, user: User){
    this.currentState = authStatus.Authenticated
    this.currentUser = user
    localStorage.setItem('token', token)
    return true
  }

  //toma un token, verifica si es valido, actualiza y devuelve un booleano
  public checkAuthentication():Observable<boolean>{
    //IMPORTANTE
    //Este es el endpoint de mi backend donde aplico el guard y devuelvo un nuevo token y un user
    const url = `${this.baseURL}/check-status`
    const token = localStorage.getItem('token')

    if(!token){
      this.logout()
      return of (false)
    }

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
  return this.http.get<checkTokenResponse>(url, {headers: headers})
 
    //aqui hay un problema porque devuelve un payload, no un user
  .pipe(
    map(({user, token}) => this.setAuthentication( token, user)),
    tap( () => this.dataUserSource.next(this.currentUser)),
    tap( () => console.log(this.currentUser)),
    catchError(() => {
      this.currentState = authStatus.NotAuthenticated
      return of (false)
    })

  )
  } 

  public logout(){
    localStorage.removeItem('token')
    this.currentState = authStatus.NotAuthenticated
    this.currentUser = null
    this.router.navigateByUrl('/auth/login')
    this.dataUserSource.next(this.currentUser)
  }


}
