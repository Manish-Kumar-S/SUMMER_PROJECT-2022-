import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { currentRoundOptions, PlacementStatusOptions, placementStatusOptions } from "src/app/student/student.resources";
import { StudentPlacementStatus } from "../placement-status.component";

@Component({
    selector: 'app-pr-change-placement-status',
    templateUrl: './change-placement-status.component.html',
    styleUrls: ['./change-placement-status.component.scss']
})
export class ChangePlacementStatusComponent {

    statusForm: FormGroup;
    
    statuses = [0,1,2,3,5,6];
    rounds = [0,1,2,3,4,5,6,7,8,9];

    selectEnable = true;

    admin = false;

    constructor(@Inject(MAT_DIALOG_DATA) data: {studentList: StudentPlacementStatus[], admin?: boolean}, private dialogRef: MatDialogRef<ChangePlacementStatusComponent>) {

        this.statusForm = new FormGroup({
            current_round: new FormControl(data.studentList[0].current_round_number, Validators.required),
            status: new FormControl(data.studentList[0].status_number, Validators.required),
            reject_others: new FormControl(true),
        });

        this.admin = data.admin;

        this.statuses = this.admin ? [0,1,2,3,4,5,6] : [0,1,2,3,4,5];
        
        this.selectEnabled();
        this.statusForm.get('status').valueChanges.subscribe(() => this.selectEnable = this.selectEnabled());
    }

    selectEnabled(): boolean {

        if(this.statusForm.get('status').value === PlacementStatusOptions.AWAITED) {

            this.statusForm.get('current_round').enable();
            return true;
        }

        this.statusForm.get('current_round').disable();

        return false;
    }

    getPlacementStatus(status: number) {

        return placementStatusOptions[status.toString()];
    }

    getCurrentRound(round: number) {

        return currentRoundOptions[round.toString()];
    }

    onSubmit() {

        const form: FormData = new FormData();

        let current_round = this.statusForm.get('current_round').value;

        if(!(this.statusForm.get('status').value === PlacementStatusOptions.AWAITED || this.statusForm.get('status').value === PlacementStatusOptions.REJECTED)) {

            current_round = -1;
        }

        form.append('current_round', current_round);
        form.append('status', this.statusForm.value['status']);

        const DATA = {
                form,
                reject_others: this.statusForm.get('reject_others').value,
        }

        this.dialogRef.close(DATA);
    }
}