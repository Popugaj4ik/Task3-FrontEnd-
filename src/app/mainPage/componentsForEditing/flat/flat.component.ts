import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';

import { FlatFormComponent } from './flat-form/flat-form.components';
import { Flat } from 'src/app/shared/flat.model';
import { House } from 'src/app/shared/house.model';
import { ConfirmDialogModel, ConfirmPageComponent } from 'src/app/confirm-page/confirm-page.component';
import { flatService } from 'src/app/shared/flat.service';
import { houseService } from 'src/app/shared/house.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: [
    './flat.style.css'
  ]
})
export class FlatComponent implements OnInit {

  private house: House;
  public list: Flat[];
  private userID: number;

  constructor(
    public service: flatService,
    public serviceHouse: houseService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public columnsToDisplay = [
    "flatNumber",
    "flatFloor",
    "FlatRooms",
    "FlatTenants",
    "FlatFullSpace",
    "FlatLivingSpace",
    "FlatHouse",
    "Buttons"
  ]

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const newFlat = new Flat();
    newFlat.houseID = this.house.id;

    dialogConfig.data = {
      flat: newFlat,
      isEdit: false,
      userID: this.userID
    };

    const dialogRef = this.dialog.open(FlatFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      switchMap(() => this.service.getFlatsByUser(this.userID))
    ).subscribe(flatList => {
      this.list = flatList;
    })
  }

  ngOnInit(): void {

    var url = this.router.url;

    var params = url.split('/');

    this.userID = parseInt(params[params.length - 3]);

    this.service.getFlatsByUser(this.userID).subscribe(res => this.list = res);

    this.activatedRoute.paramMap.subscribe(params => {
      const idSTR = params.get('id');

      let houseID: number = NaN;

      if (idSTR) {
        houseID = parseInt(idSTR);
      } else {
        this.router.navigate(['']);
      }

      if (isNaN(houseID)) {
        this.router.navigate(['']);
      }

      this.serviceHouse.getHouse(houseID).subscribe(res => {
        this.house = res || new House();
      });

      if (this.house == new House()) {
        this.router.navigate(['']);
      }
    })
  }

  populateForm(selectedFlat: Flat) {
    const flat = Object.assign({}, selectedFlat);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      flat: flat,
      isEdit: true,
      userID: this.userID
    };

    const dialogRef = this.dialog.open(FlatFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      switchMap(() => this.service.getFlatsByUser(this.userID))
    ).subscribe(res => {
      this.list = res.filter(f => f.houseID == this.house.id);
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
      switchMap(() => this.service.deleteFlat(id).pipe(
        switchMap(() => this.service.getFlatsByUser(this.userID))
      ))
    ).subscribe(res => {
      this.list = res.filter(f => f.houseID == this.house.id);
    })
  }

  returnHouse() {
    // if(this._house) {
    //   return this._house.city + " " + this._house.street + "-" + this._house.number + " " + this._house.postalID
    // } else {
    //   return '';
    // }

    // retur nthis._house ?  this._house.city + " " + this._house.street + "-" + this._house.number + " " + this._house.postalID : '';

    if (this.house == undefined)
      return '';
    else
      return this.house.city + " " + this.house.street + "-" + this.house.number + " " + this.house.postalID
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
          this.service.postFlat(this.rowToFlat(rowdata as string[])).pipe(
            switchMap(() => this.service.getFlatsByUser(this.userID))
          ).subscribe(flatList => {
            this.list = flatList.filter(f => f.houseID == this.house.id);
          }
            , err => {
              console.log(err);
            })
        }
      }
    }
    else {
      alert("Only .csv files is valid");
    }
  }
  rowToFlat(row: string[]) {
    const flat = new Flat();
    flat.flatNumber = row[0];
    flat.floor = parseInt(row[1])
    flat.roomsCount = parseInt(row[2]);
    flat.fullSpace = parseFloat(row[3])
    flat.livingSpace = parseFloat(row[4]);
    flat.houseID = this.house.id;
    return flat;
  }
}
