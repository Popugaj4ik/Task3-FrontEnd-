import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariables } from '../shared/global.variable';
import { LoginRegisterService } from '../shared/LoginRegister.servise';
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
    private service: LoginRegisterService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      eMail: '',
      password: ''
    });
    GlobalVariables.isLoggedIn = false;
  }

  onLogin() {
    const get = this.form.value as User;
    get.password = this.service.HashPassword(get.password);

    const user = new User();
    user.eMail = get.eMail;
    user.password = get.password;

    this.service.loginUser(user).subscribe(
      res => {
        const user = res as User;
        GlobalVariables.isLoggedIn = true;
        this.router.navigate([`/edit-list/${user.id}`]);
      },
      err => {
        console.log(err);
      })
  }

}
