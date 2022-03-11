import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, _MatDialogContainerBase } from '@angular/material/dialog';

import { House } from 'src/app/shared/house.model';
import { HouseFormComponent } from './house-form/house-form.component';
import { ConfirmDialogModel, ConfirmPageComponent } from '../confirm-page/confirm-page.component';
import { houseService } from 'src/app/shared/house.service';
import { filter, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: [
    './house.style.css'
  ]
})
export class HouseComponent implements OnInit {

  public list: House[];

  private userID: number;

  constructor(
    public service: houseService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public columnsToDisplay = [
    "houseNumber",
    "houseStreet",
    "houseCity",
    "housePostalID",
    "Buttons"
  ];

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      house: new House(),
      isEdit: false,
      userID: this.userID
    };

    const dialogRef = this.dialog.open(HouseFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      switchMap(() => this.service.getHousesByUser(this.userID))
    )
      .subscribe(houselist => {
        this.list = houselist;
      });
  }

  ngOnInit(): void {
    var url = this.router.url;

    var params = url.split('/');

    this.userID = parseInt(params[params.length - 2]);

    this.service.getHousesByUser(this.userID).subscribe(res => this.list = res);
  }

  populateForm(selectedHouse: House) {
    const house = Object.assign({}, selectedHouse);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      house: house,
      isEdit: true,
      userID: this.userID
    };

    const dialogRef = this.dialog.open(HouseFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      switchMap(()=>this.service.getHousesByUser(this.userID))
    ).subscribe(
      res=>{
        this.list = res;
      }
    )
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
      filter(isConfirm => isConfirm),
      switchMap(() => this.service.deleteHouse(id).pipe(
        switchMap(() => this.service.getHousesByUser(this.userID))
      ))
    ).subscribe(houseList => {
      this.list = houseList;
    });

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
          this.service.postHouse(this.rowToHouse(rowdata as string[])).pipe(
            switchMap(() => this.service.getHousesByUser(this.userID))
          )
            .subscribe(houseList => {
              this.list = houseList;
            },
              err => {
                console.log(err);
              })
        }
      }
    }
    else {
      alert("Only .csv files is valid");
    }
  }

  rowToHouse(row: string[]) {
    const house = new House();
    house.number = row[0];
    house.street = row[1];
    house.city = row[2];
    house.postalID = row[3];
    house.UserOwnerID = this.userID;
    return house;
  }
}