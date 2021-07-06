import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, Subscription, timer} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {TokenModel} from '../../models/token.model';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public subscription: Subscription;

  public jwToken: BehaviorSubject<TokenModel> = new BehaviorSubject<TokenModel>({
    isAuthenticated: null,
    token: null
  });

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService) {
    this.initToken();
    this.subscription = this.initTimer();
  }

  public initTimer(): Subscription {
    return timer(2000, 5000).pipe(
      switchMap(() => {
        if (localStorage.getItem('jwt')) {
          return this.http.get<string>('/api/auth/refresh-token').pipe(
            tap((token: string) => {
              this.jwToken.next({
                isAuthenticated: true,
                token
              });
              localStorage.setItem('jwt', token);
            })
          );
        } else {
          this.subscription.unsubscribe();
          return of(null);
        }
      })
    ).subscribe(() => {
    }, err => {
      this.jwToken.next({
        isAuthenticated: false,
        token: null
      });
      localStorage.removeItem('jwt');
      this.subscription.unsubscribe();
    });
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwToken.next({
        isAuthenticated: true,
        token
      });
    } else {
      this.jwToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public signup(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('/api/auth/signup', user);
  }

  public signin(credentials: { email: string, password: string }): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials)
      .pipe(
        tap((token: string) => {
          this.jwToken.next({
            isAuthenticated: true,
            token
          });
          localStorage.setItem('jwt', token);
          this.subscription = this.initTimer();
        })
      );
  }

  public logout(): void {
    this.jwToken.next({
      isAuthenticated: false,
      token: null
    });
    this.userService.currentUser.next(null);
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }

}
