import { EmployeeService } from './../../../commons/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees;

  constructor(
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  async getEmployees() {
    this.employees = await this.employeeService.getEmployees();
  }

  createEmployee(employee) {
    this.employeeService
      .createEmployees(employee)
      .toPromise()
      .then()
      .catch((e) => {
        this._snackBar.openFromComponent(EmployeeComponent, {
          data: 'Hubo un error al registrar el empleado',
          duration: 5000,
          horizontalPosition: 'start',
          verticalPosition: 'top',
        });
      })
      .finally(() => {
        this.getEmployees();
      });
  }
}
