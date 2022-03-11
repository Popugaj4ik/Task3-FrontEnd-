import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-confirm-page',
    templateUrl: './confirm-page.component.html',
    styles: [

    ]
})
export class ConfirmPageComponent implements OnInit {

    title: string;
    message: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmPageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
    ) {
        this.title = data.title;
        this.message = data.message;
    }
    ngOnInit(): void {

    }
    onCommand(): void {
        this.dialogRef.close(true);
    }
    onCancel(): void {
        this.dialogRef.close(false);
    }

}
export class ConfirmDialogModel {
    constructor(public title: string, public message: string) {

    }
}