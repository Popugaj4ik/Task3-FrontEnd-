import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Flat } from 'src/app/shared/flat.model';
import { flatService } from 'src/app/shared/flat.service';
import { House } from 'src/app/shared/house.model';
import { houseService } from 'src/app/shared/house.service';


@Component({
  selector: 'app-flat-form',
  templateUrl: './flat-form.component.html',
  styleUrls: [
    './flat-form.style.css'
  ]
})
export class FlatFormComponent implements OnInit {

  public form: FormGroup;
  public flat: Flat;
  public houseList: House[];
  private isEdit: boolean;
  private userID: number;

  constructor(
    public service: flatService,
    public serviceHouse: houseService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.flat = data.flat;
    this.isEdit = data.isEdit;
    this.userID = data.userID;
  }

  ngOnInit(): void {
    this.serviceHouse.getHouses().subscribe(res => {
      this.houseList = res;
    });
    this.form = this._fb.group({
      id: '0',
      flatNumber: '',
      floor: '',
      roomsCount: '',
      fullSpace: '',
      livingSpace: '',
      houseID: this.flat.houseID
    });
    if (this.isEdit) {
      this.form.patchValue(this.flat);
    }
  }

  onSubmit() {
    const flat = this.form.value as Flat;
    flat.UserOwnerID = this.userID;
    if (!this.isEdit) {
      this.insertFlat(flat);
    }
    else {
      this.updateFlat(flat);
    }
  }

  insertFlat(flat: Flat) {
    this.service.postFlat(flat).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    )
  }

  updateFlat(flat: Flat) {
    this.service.putFlat(flat).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    )
  }

  isEditing() {
    return this.isEdit;
  }
}
