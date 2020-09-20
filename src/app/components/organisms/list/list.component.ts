import { TypeDocument } from './../../../commons/enums/type-document.enum';
import { Employee } from './../../../commons/models/employee.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() employees: Employee[];
  displayedColumns: string[] = [
    'documentType',
    'documentNumber',
    'name',
    'lastName',
    'boss',
  ];

  constructor() {}

  ngOnInit(): void {}

  parseTypeDocument(key) {
    return TypeDocument[key];
  }
}
