import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest }from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyAuthInterceptor implements HttpInterceptor {

intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        let tokenizedReq =req.clone({
          setHeaders:{
            /*Le format de token attendu par les micro-services est "Bearer "+token.
            L'espace avant le token est enregistré dans le localStorage à la récupération du token.*/
            Authorization: 'Bearer'+token
          }
        })
        return next.handle(tokenizedReq)
      }
      
}