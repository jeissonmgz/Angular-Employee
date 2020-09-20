import { TypeDocument } from './../enums/type-document.enum';
export class Employee {
  id: Number;
  documentType: string;
  documentNumber: string;
  name: string;
  lastName: string;
  function: string;
  boss: Employee;
}
