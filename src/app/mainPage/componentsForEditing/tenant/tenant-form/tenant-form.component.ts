import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Tenant } from 'src/app/shared/tenant.model';
import { Flat } from 'src/app/shared/flat.model';
import { House } from 'src/app/shared/house.model';
import { tenantService } from 'src/app/shared/tenant.service';
import { flatService } from 'src/app/shared/flat.service';
import { houseService } from 'src/app/shared/house.service';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: [
    './tenant-form.style.css'
  ]
})
export class TenantFormComponent implements OnInit {

  public form: FormGroup;
  public tenant: Tenant;
  public flatList: Flat[];
  public houseList: House[];
  private isEdit: boolean;
  private userID: number;

  constructor(
    public service: tenantService,
    public serviceFlat: flatService,
    public serviceHouse: houseService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.tenant = data.tenant;
    this.isEdit = data.isEdit;
    this.userID = data.userID;
  }

  ngOnInit(): void {
    this.serviceHouse.getHouses().subscribe(res => {
      this.houseList = res;
    });
    this.serviceFlat.getFlats().subscribe(res => {
      this.flatList = res;
    });
    this.form = this._fb.group({
      id: '0',
      name: '',
      surname: '',
      personalID: '',
      dateOfBirth: '',
      phoneNumber: '',
      eMail: '',
      tenantHouseID: '',
      flatID: this.tenant.flatID
    });
    if (this.isEdit) {
      this.form.patchValue({ ...this.tenant });
    }
  }

  onSubmit() {
    const tenant = this.form.value as Tenant;
    tenant.UserOwnerID = this.userID;
    if (!this.isEdit) {
      this.insertTenant(tenant);
    }
    else {
      this.updateTenant(tenant);
    }
  }

  insertTenant(tenant: Tenant) {
    this.service.postTenant(tenant)
      .subscribe(
        res => {

        },
        err => {
          console.log(err);
        }
      )
  }

  updateTenant(tenant: Tenant) {
    this.service.putTenant(tenant).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    )
  }

  filterFlats(HouseID: number) {
    return this.flatList.filter(f => f.houseID == HouseID);
  }

  isEditing() {
    return this.isEdit;
  }
}