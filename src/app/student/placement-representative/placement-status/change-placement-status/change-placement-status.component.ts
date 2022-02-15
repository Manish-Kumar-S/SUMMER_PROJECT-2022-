import { Component, Inject } from "@angular/core";
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

    selectEnabled() {

        if(this.statusForm.get('status').value === PlacementStatusOptions.AWAITED || this.statusForm.get('status').value === PlacementStatusOptions.REJECTED) {

            this.statusForm.get('current_round').enable();
        }

        else this.statusForm.get('current_round').disable();
    }

    constructor(@Inject(MAT_DIALOG_DATA) data: {studentList: StudentPlacementStatus[]}, private dialogRef: MatDialogRef<ChangePlacementStatusComponent>) {

        
        this.statusForm = new FormGroup({
            current_round: new FormControl(data.studentList[0].current_round_number, Validators.required),
            status: new FormControl(data.studentList[0].status_number, Validators.required)
        });
        
        this.selectEnabled();
        this.statusForm.get('status').valueChanges.subscribe(() => this.selectEnabled());
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

        this.dialogRef.close(form);
    }
}