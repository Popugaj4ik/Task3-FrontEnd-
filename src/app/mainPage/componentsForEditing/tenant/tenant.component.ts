import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { Tenant } from 'src/app/shared/tenant.model';
import { Flat } from 'src/app/shared/flat.model';
import { ConfirmDialogModel, ConfirmPageComponent } from 'src/app/confirm-page/confirm-page.component';
import { tenantService } from 'src/app/shared/tenant.service';
import { flatService } from 'src/app/shared/flat.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: [
    './tenant.style.css'
  ]
})
export class TenantComponent implements OnInit {

  public list: Tenant[];
  private flat: Flat;
  private userID: number;

  constructor(
    public service: tenantService,
    public serviceFlat: flatService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public columnsToDisplay = [
    "tenantName",
    "tenantSurname",
    "tenantPersonalID",
    "tenantDateOfBirth",
    "tenantPhoneNumber",
    "tenantEMail",
    "tenantFlat",
    "Buttons"
  ]

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const newTenant = new Tenant();
    newTenant.flatID = this.flat.id;
    dialogConfig.data = {
      tenant: newTenant,
      isEdit: false,
      userID: this.userID
    };

    const dialogRef = this.dialog.open(TenantFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      switchMap(() => this.service.getTenantsByUser(this.userID))
    ).subscribe(tenantlist => {
      this.list = tenantlist;
    })
  }

  ngOnInit(): void {

    var url = this.router.url;

    var params = url.split('/');

    this.userID = parseInt(params[params.length - 3]);

    this.service.getTenantsByUser(this.userID).subscribe(res => this.list = res);

    this.activatedRoute.paramMap.subscribe(params => {
      const idSTR = params.get('id');

      let flatID: number = NaN;

      if (idSTR)
        flatID = parseInt(idSTR);
      else
        this.router.navigate(['']);

      if (isNaN(flatID))
        this.router.navigate(['']);

      this.serviceFlat.getFlat(flatID).subscribe(res => {
        this.flat = res || new Flat();
      })

      if (this.flat == new Flat())
        this.router.navigate(['']);


    })
  }

  populateForm(selectedTenant: Tenant) {
    const tenant = Object.assign({}, selectedTenant);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      tenant: tenant,
      isEdit: true
    };

    const dialogRef = this.dialog.open(TenantFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      switchMap(() => this.service.getTenantsByUser(this.userID))
    ).subscribe(tenantlist => {
      this.list = tenantlist;
    })
  }

  onDelete(id: number) {
    const message = "Are you sure to delete this reccords?";
    const title = "Confirm message";

    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmPageComponent, {
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().pipe(
      filter(dialogResult => dialogResult),
      switchMap(() => this.service.deleteTenant(id).pipe(
        switchMap(() => this.service.getTenants())
      ))
    ).subscribe(res => {
      this.list = res.filter(t => t.flatID == this.flat.id);
    })
  }

  returnFlatNumber() {
    if (this.flat == undefined)
      return '';
    else
      return this.flat.flatNumber;
  }

  fileSelect($event: any) {
    var files = $event.srcElement.files;
    if (files[0].name.endsWith('.csv')) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        for (let i = 0; i < csvRecordsArray.length; i++) {
          let rowdata = csvRecordsArray[i].match(/("[^"]*")|[^,]+/g);
          this.service.postTenant(this.rowToTenant(rowdata as string[])).pipe(
            switchMap(() => this.service.getTenants())
          ).subscribe(tenantList => {
            this.list = tenantList.filter(t => t.flatID == this.flat.id);
          })
        }
      }
    }
    else {
      alert("Only .csv files is valid");
    }
  }
  rowToTenant(row: string[]) {
    const tenant = new Tenant();
    tenant.name = row[0];
    tenant.surname = row[1];
    tenant.personalID = row[2];
    tenant.dateOfBirth = new Date(row[3]);
    tenant.phoneNumber = row[4];
    tenant.eMail = row[5];
    tenant.flatID = this.flat.id;
    return tenant;
  }

}
