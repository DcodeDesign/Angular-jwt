import {NgModule} from '@angular/core';

// modules
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from './shared/modules/layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// components
import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {TopbarComponent} from './shared/components/topbar/topbar.component';
import {ProfileComponent} from './profile/profile.component';

// services
import {AuthService} from './shared/services/auth/auth.service';
import {UserService} from './shared/services/user/user.service';

// guards
import {AuthGuard} from './shared/guards/auth/auth.guard';

// interceptors
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
