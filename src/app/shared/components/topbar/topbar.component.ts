import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenModel} from '../../models/token.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public jwToken: TokenModel;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  public isAuthenticated(): void {
    this.authService.jwToken.pipe(takeUntil(this.destroy$)).subscribe((jwToken: TokenModel) => {
      this.jwToken = jwToken;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
