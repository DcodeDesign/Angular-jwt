import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  public getCurrentUser(): Observable<UserModel> {
    if (this.currentUser.value) {
      return this.currentUser;
    } else {
      return this.http.get<UserModel>('/api/user/current').pipe(
        tap((user: UserModel) => {
          console.log(user);
          this.currentUser.next(user);
        }),
        switchMap(() => {
          return this.currentUser;
        })
      );
    }
  }

}
