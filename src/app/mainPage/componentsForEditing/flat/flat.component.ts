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
import { TokenService } from 'src/app/shared/token.service';
import { environment } from 'src/environments/environment';

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
    public flatService: flatService,
    public houseService: houseService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
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
      switchMap(() => this.flatService.getFlatsByUser(this.userID))
    ).subscribe(flatList => {
      this.list = flatList;
    });

    this.refreshToken();
  }

  ngOnInit(): void {

    var url = this.router.url;

    var params = url.split('/');

    this.userID = parseInt(params[params.length - 3]);

    this.flatService.getFlatsByUser(this.userID).subscribe(res => this.list = res);

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

      this.houseService.getHouse(houseID).subscribe(res => {
        this.house = res || new House();
      });

      if (this.house == new House()) {
        this.router.navigate(['']);
      }
    });

    this.refreshToken();
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
      switchMap(() => this.flatService.getFlatsByUser(this.userID))
    ).subscribe(res => {
      this.list = res.filter(f => f.houseID == this.house.id);
    });

    this.refreshToken();
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
      switchMap(() => this.flatService.deleteFlat(id).pipe(
        switchMap(() => this.flatService.getFlatsByUser(this.userID))
      ))
    ).subscribe(res => {
      this.list = res.filter(f => f.houseID == this.house.id);
    });

    this.refreshToken();
  }

  returnHouse() {
    return this.house ? this.house.city + " " + this.house.street + "-" + this.house.number + " " + this.house.postalID : '';
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
          this.flatService.postFlat(this.rowToFlat(rowdata as string[])).pipe(
            switchMap(() => this.flatService.getFlatsByUser(this.userID))
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

    this.refreshToken();
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

  private refreshToken() {
    this.tokenService.refreshToken().subscribe(jwt => {
      localStorage.setItem(environment.jwt, jwt);
    },
      err => {
        console.log(err);
      });
  }
}
