import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {

    //Se o usuário tiver logado emit um true aqui;
    if (localStorage.getItem('token')) {
    }

    return this.loggedIn.asObservable();
  }


  login(email: string, password: string): Observable<any> {
    const passwordEncode = window.btoa(password);
    return this.http.post<any>('/api/login', { email, passwordEncode })
      .pipe(
        map(result => {
          this.userService.user = result;
          localStorage.setItem('token', result.token);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
          return true;
        })
      );
  }

  register(form): Observable<any>{
    return this.http.post<any>('/api/register', form)

  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  verifyEmail(email: string): Observable<boolean> {
    return this.http.post<boolean>('/api/verify-email/', { email });
  }

}