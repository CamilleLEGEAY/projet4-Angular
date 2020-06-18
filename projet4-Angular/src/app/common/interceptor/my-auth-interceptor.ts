import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest }from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyAuthInterceptor implements HttpInterceptor {

intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
/*        const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
        return next.handle(authReq);*/
        let tokenizedReq =req.clone({
          setHeaders:{
            Authorization:`Bearer ${token}`
          }
        })
        return next.handle(tokenizedReq)
      }
      
}