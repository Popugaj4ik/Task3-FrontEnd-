import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { House } from 'src/app/shared/house.model';
import { houseService } from 'src/app/shared/house.service';

@Component({
  selector: 'app-house-form',
  templateUrl: './house-form.component.html',
  styleUrls: [
    './house-form.style.css'
  ]
})
export class HouseFormComponent implements OnInit {

  public form: FormGroup;
  public house: House;
  private isEdit: boolean;
  private userID: number;
  
  constructor(
    public service: houseService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.house = data.house;
    this.isEdit = data.isEdit;
    this.userID = data.userID;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      id: '0',
      number: '',
      street: '',
      city: '',
      postalID: ''
    });
    if (this.isEdit) {
      this.form.patchValue(this.house);
    }
  }

  onSubmit() {
    const house: House = this.form.value as House;
    house.UserOwnerID = this.userID;
    if (!this.isEdit) {
      this.insertHouse(house);
    }
    else {
      this.updateHouse(house);
    }
  }

  insertHouse(house: House) {
    this.service.postHouse(house).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    )
  }

  updateHouse(house: House) {
    this.service.putHouse(house).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    )
  }
}
