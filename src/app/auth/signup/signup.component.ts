import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/services/auth/auth.service';
import {UserModel} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public error: string;
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signinForm();
  }

  public signinForm(): void {
    this.form = this.fb.group({
      email: [''],
      name: [''],
      password: ['']
    });
  }

  public submit(): void {
    this.authService.signup(this.form.value).subscribe(
      (user: UserModel) => {
        this.router.navigate(['/signin']);
      }, err => {
       this.error = err.error;
      }
    );
    console.log(this.form.value);
  }


}
