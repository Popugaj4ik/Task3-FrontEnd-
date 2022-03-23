import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalVariables } from '../shared/global.variable';
import { LoginService } from '../shared/login.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      eMail: '',
      password: ''
    });
    GlobalVariables.isLoggedIn = false;
    localStorage.removeItem(environment.jwt);
  }

  Login() {
    const get = this.form.value as User;

    const user = new User();
    user.eMail = get.eMail;
    user.password = get.password;

    this.loginService.loginUser(user).subscribe(
      res => {
        GlobalVariables.isLoggedIn = true;
        localStorage.setItem(environment.jwt, res.token);
        this.router.navigate([`/edit-list/${res.id}`]);
      },
      err => {
        console.log(err);
      })
  }

}
