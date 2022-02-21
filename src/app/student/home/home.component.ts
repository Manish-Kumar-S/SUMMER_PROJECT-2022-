import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { companyStatusOptions, currentRoundOptions, placementStatusOptions } from '../student.resources';
import { StudentService } from '../student.service';

export interface AppliedCompanies {

    // company_drive_id: number;
    serial_number: number;
    company_name: string,
    drive_name: string,
    current_round_number: number,
    current_round: string,
    status_number: number,
    status: string,
    company_drive_status_number: number,
    company_drive_status: string,
}

interface AppliedCompaniesFilters {

    company_name: {filters: string[]},
    drive_name: {filters: string[]},
    current_round: {filters: string[]},
    status: {filters: string[]}
    company_drive_status: {filters: string[]}
}

@Component({
    selector: 'app-student-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    company_list: AppliedCompanies[];

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    displayedColumns = ['serial_number' ,
                        'drive_name',
                        'company_name',
                        'current_round',
                        'status',
                        'company_drive_status'];

    dataSource = new MatTableDataSource<AppliedCompanies>();

    filters: AppliedCompaniesFilters = {

        drive_name: {
            filters: [],
        },
        company_name: {
            filters: [],
        },
        current_round: {
            filters: [],
        },
        status: {
            filters: [],
        },
        company_drive_status: {
            filters: [],
        }
    }

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        
        this.setDatasource();
    }

    setDatasource() {

        this.studentService.getAppliedCompanies().pipe(

            map((response): AppliedCompanies[] => {

                if(response.company_list === null) return [];

                return response.company_list.map((company, index): AppliedCompanies => {

                    return {
                        serial_number: index + 1,
                        company_name: company.company_name,
                        drive_name: company.drive_name,
                        current_round_number: company.current_round,
                        current_round: this.getCurrentRound(company.current_round),
                        status_number: company.status,
                        status: this.getPlacementStatus(company.status),
                        company_drive_status_number: company.company_drive_status,
                        company_drive_status: this.getCompanyDriveStatus(company.company_drive_status),
                    };
                });
            })

        ).subscribe((list) => {

            this.company_list = list;
            this.dataSource.data = this.applyFilters();
        })
    }

    getCurrentRound(round: number): string {

        return currentRoundOptions[round.toString()];
    }

    getPlacementStatus(status: number){
        
        return placementStatusOptions[status.toString()];
    }

    getCompanyDriveStatus(status: number){
        
        return companyStatusOptions[status.toString()];
    }

    ///////////////////////
    // FILTERS
    ///////////////////////

    private applyFilters(): AppliedCompanies[] {

        let filteredData: AppliedCompanies[] = Array.from(this.company_list);

        Object.keys(this.filters).forEach((filterColumn) => {

            if(this.filters[filterColumn].filters.length === 0) return;

            filteredData = filteredData.filter((student) => {

                const pred = this.filters[filterColumn].filters.map((filter) => filter.toString().toLowerCase()).includes(student[filterColumn].toString().toLowerCase());
                return pred;
            });
        });

        return filteredData;
    }

    add(event: MatChipInputEvent, column: string, type: 'text' | 'number'): void {
        const value = (event.value || '').trim();

        let values: (string | number)[] = value.split(',');

        if(type === "number") values = values.map(value => parseInt(value.toString()));

        if(value) values.forEach(value => this.filters[column].filters.push(value));

        this.dataSource.data = this.applyFilters();
    
        // Clear the input value
        event.input.value = '';
    }

    remove(filter: string | number, column: string): void {
        
        const index = this.filters[column].filters.indexOf(filter);

        if (index >= 0) {

            this.filters[column].filters.splice(index, 1);
            this.dataSource.data = this.applyFilters();
        }
    }

    clearFilters(column: string) {

        this.filters[column].filters = [];
        this.dataSource.data = this.applyFilters();
    }

}