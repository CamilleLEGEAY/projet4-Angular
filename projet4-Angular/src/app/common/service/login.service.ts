import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../data/login';
import { LoginResponse } from '../data/login-response';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _headers = new HttpHeaders({'Content-Type': 'application/json'}); 

  constructor(private http : HttpClient) { }

  /**
   * to register a new user
   * @param login 
   */
  public postRegister(login: Login): Observable<LoginResponse>{
    let url="msLogin/public/newUser"; //sera préfixé par http://localhost:8282
    //via l'option --proxy-config proxy.conf.json de ng serve
    //NB: map() transforme et tap() declenche un traitement en plus sans transformer
    return this.http.post<LoginResponse>(url,login, {headers: this._headers} )
           .pipe(
               tap((loginResponse)=>{ console.log(loginResponse.token); this.sauvegarderJeton(loginResponse);})
           );
 }

  /**
   * to login a user +save his token
   * @param login 
   */
  public postLogin(login: Login): Observable<LoginResponse>{
     let url="msLogin/public/User/login"; //sera préfixé par http://localhost:8282
     //via l'option --proxy-config proxy.conf.json de ng serve
     //NB: map() transforme et tap() declenche un traitement en plus sans transformer
     return this.http.post<LoginResponse>(url,login, {headers: this._headers} )
            .pipe(
                tap((loginResponse)=>{ this.sauvegarderJeton(loginResponse);})
            );
  }

  /**
   * to update a user +save his token
   * @param login 
   */
  public postUpdate(login: Login): Observable<LoginResponse>{
    let url="msLogin/updateUser"; //sera préfixé par http://localhost:8282
    //via l'option --proxy-config proxy.conf.json de ng serve
    //NB: map() transforme et tap() declenche un traitement en plus sans transformer
    return this.http.put<LoginResponse>(url,login, {headers: this._headers} )
           .pipe(
               tap((loginResponse)=>{ this.sauvegarderJeton(loginResponse);})
           );
  }

  /**
   * to update a user +save his token
   * @param login 
   */
  public postDelete(): Observable<LoginResponse>{
    let url="msLogin/supprUser"; //sera préfixé par http://localhost:8282
    //via l'option --proxy-config proxy.conf.json de ng serve
    //NB: map() transforme et tap() declenche un traitement en plus sans transformer
    return this.http.delete<LoginResponse>(url, {headers: this._headers} )
    .pipe(
      tap((loginResponse)=>{ this.sauvegarderJeton(loginResponse);})
    );
  }

  /**
   * save de token
   * @param loginResponse
   */
  private sauvegarderJeton(loginResponse:LoginResponse){
       if(loginResponse.token!=null){
         localStorage.setItem('token',loginResponse.token);
       }
       else {
        // loginResponse.message = "Erreur d'autentification";
         console.log(loginResponse.message)};
  }

}