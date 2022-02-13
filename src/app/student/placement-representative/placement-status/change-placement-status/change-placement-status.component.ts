import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { currentRoundOptions, placementStatusOptions } from "src/app/student/student.resources";
import { StudentPlacementStatus } from "../placement-status.component";

@Component({
    selector: 'app-pr-change-placement-status',
    templateUrl: './change-placement-status.component.html',
    styleUrls: ['./change-placement-status.component.scss']
})
export class ChangePlacementStatusComponent {

    statusForm: FormGroup;
    
    statuses = [0,1,2,3,4];
    rounds = [0,1,2,3,4,5,6,7,8,9];

    constructor(@Inject(MAT_DIALOG_DATA) data: {studentList: StudentPlacementStatus[]}, private dialogRef: MatDialogRef<ChangePlacementStatusComponent>) {

        this.statusForm = new FormGroup({
            current_round: new FormControl(data.studentList[0].current_round_number, Validators.required),
            status: new FormControl(data.studentList[0].status_number, Validators.required)
        });
    }

    getPlacementStatus(status: number) {

        return placementStatusOptions[status];
    }

    getCurrentRound(round: number) {

        return currentRoundOptions[round];
    }

    onSubmit() {
        const form: FormData = new FormData();
        form.append('current_round', this.statusForm.value['current_round']);
        form.append('status', this.statusForm.value['status']);
        this.dialogRef.close(form);
    }
}