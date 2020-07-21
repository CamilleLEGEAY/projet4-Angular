import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../data/login';
import { LoginResponse } from '../data/login-response';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginUpdate } from '../data/login-update';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged:boolean = false;

  private _headers = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http : HttpClient) { }

  /**
   * to register a new user
   * @param login 
   */
  public postRegister(login: Login): Observable<LoginResponse>{
    let url= environment.msLogin+"/public/newUser";
    //let url= "/msLogin/public/newUser";
    console.log(url);
    return this.http.post<LoginResponse>(url,login, {headers: this._headers} )
           .pipe(
               tap((loginResponse)=>{ 
                 console.log(loginResponse.token);
                 this.sauvegarderJeton(loginResponse);
                 this.logged=true;
                })
           );
 }

  /**
   * to login a user +save his token
   * @param login 
   */
  public postLogin(login: Login): Observable<LoginResponse>{
     let url=environment.msLogin+"/msLogin/public/login";
     //let url="/msLogin/public/login";
     console.log(url);
     return this.http.post<LoginResponse>(url,login, {headers: this._headers} )
            .pipe(
                tap((loginResponse)=>{ 
                  this.sauvegarderJeton(loginResponse);
                  this.logged=true;
                })
            );
  }

  /**
   * to update a user +save his token
   * @param loginUpdate 
   */
  public postUpdate(loginUpdate: LoginUpdate): Observable<String>{
    let url=environment.msLogin+"/msLogin/updateUser";
    //let url="/msLogin/updateUser";
    return this.http.put<String>(url,loginUpdate, {headers: this._headers} )
  }

  /**
   * to update a user +save his token
   * @param login 
   */
  public postDelete(): Observable<LoginResponse>{
    let url=environment.msLogin+"/msLogin/supprUser/"+sessionStorage.getItem('token').trim();
    //let url="/msLogin/supprUser/"+sessionStorage.getItem('token').trim();
    return this.http.delete<LoginResponse>(url, {headers: this._headers} )
    .pipe(
      tap((loginResponse)=>{ 
        sessionStorage.setItem('token',loginResponse.token);
        this.logged=false;
        
      })
    );
  }

  /**
   * save de token
   * @param loginResponse
   */
  private sauvegarderJeton(loginResponse:LoginResponse){
       if(loginResponse.token!=null){
         sessionStorage.setItem('token',` ${loginResponse.token}`);
       }
       else {
         console.log(loginResponse.message)};
  }

}