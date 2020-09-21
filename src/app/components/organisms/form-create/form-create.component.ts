import { Employee } from './../../../commons/models/employee.model';
import { TypeDocument } from './../../../commons/enums/type-document.enum';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const validateDocument = (employees) => {
  return (control: AbstractControl) => {
    if (employees === undefined || control.value === undefined) {
      return null;
    }
    const findEmployee = employees.find(
      (employee) =>
        employee.documentType === control.value.documentType &&
        employee.documentNumber === control.value.documentNumber
    );
    return findEmployee !== undefined
      ? { mustBeDifferentDocument: true }
      : null;
  };
};

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss'],
})
export class FormCreateComponent implements OnInit, OnChanges {
  isCreate = false;
  documentTypes = [];
  @Input() bosses;
  @Input() employees;
  submitted = false;
  form: FormGroup;
  @Output() sendForm = new EventEmitter<Employee>();
  bossList = [];

  constructor(private formBuilder: FormBuilder) {}

  resetForm() {
    this.form = this.formBuilder.group(
      {
        documentType: new FormControl('', Validators.required),
        documentNumber: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        function: new FormControl('', Validators.required),
        boss: new FormControl(null),
      },
      {
        validator: validateDocument(this.employees),
      }
    );
  }

  loadBossList() {
    let bossList = [{ display: '', value: null }];
    this.bosses.forEach((boss) => {
      bossList = [
        ...bossList,
        { display: `${boss.name} ${boss.lastName}`, value: boss },
      ];
    });
    this.bossList = bossList;
  }

  ngOnInit(): void {
    this.loadBossList();
    this.resetForm();
    this.loadDocumentTypes();
  }

  ngOnChanges(): void {
    this.loadBossList();
    this.resetForm();
  }

  loadDocumentTypes() {
    const keys = Object.keys(TypeDocument);
    let options = [];
    keys.forEach((key) => {
      options = [...options, { key, value: TypeDocument[key] }];
    });
    this.documentTypes = options;
  }

  // Getter function in order to get form controls value
  get f() {
    return this.form.controls;
  }

  get isMustBeDifferentDocument() {
    return this.form.errors && this.form.errors.mustBeDifferentDocument;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const employee = new Employee();
    employee.documentType = this.form.value.documentType;
    employee.documentNumber = this.form.value.documentNumber;
    employee.name = this.form.value.name;
    employee.lastName = this.form.value.lastName;
    employee.function = this.form.value.function;
    employee.boss = this.form.value.boss;
    this.sendForm.emit(employee);
    this.resetForm();
    this.submitted = false;
    this.isCreate = false;
  }
}
