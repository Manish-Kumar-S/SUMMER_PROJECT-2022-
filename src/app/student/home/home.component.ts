import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
    selector: 'app-student-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        
        this.studentService.getAppliedCompanies()
            .subscribe((result) => {

                console.log(result);
            })
    }
}