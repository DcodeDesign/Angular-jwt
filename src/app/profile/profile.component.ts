import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user/user.service';
import {UserModel} from '../shared/models/user.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public currentUser: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   this.getCurrentUser();
  }

  public getCurrentUser(): Subscription {
    return this.userService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe(
      (user: UserModel) => {
        console.log(user);
        this.currentUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
