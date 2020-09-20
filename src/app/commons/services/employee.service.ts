import { Employee } from './../models/employee.model';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = environment.backendEmployee + 'employee/';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[];

  constructor(private http: HttpClient) {}

  async getEmployees() {
    this.employees = (await this.http.get(url).toPromise()) as Employee[];
    console.log(this.employees[0].documentType);

    return this.employees;
  }
}
