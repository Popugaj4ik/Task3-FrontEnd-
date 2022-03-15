import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariables } from '../shared/global.variable';
import { RegistrationService } from '../shared/registration.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: '',
      eMail: '',
      password: ''
    });
    GlobalVariables.isLoggedIn = false;
  }

  Register() {
    const user: User = this.form.value as User;
    this.registrationService.registerUser(user).subscribe(
      res => {
        if (res === null) {
          this.form.patchValue(new User());
          alert("Used e-mail or username already exist");
        }
        else {
          GlobalVariables.isLoggedIn = true;
          this.router.navigate([`/edit-list/${(res as User).id}`]);
        }

      },
      err => {
        console.log(err);
      }
    )
  }

}
