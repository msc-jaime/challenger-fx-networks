import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';
import { EmployeeService } from '@app/_services';
import { Employees } from '@app/_models';

@Component({
  templateUrl: './list.component.html',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf]
})
export class ListComponent {
  employees!: Employees;
  isDeleting = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .pipe(first())
      .subscribe(employees => { this.employees = employees });
  }

  deleteEmployee(id: string) {
    this.isDeleting = true;
    this.employeeService.delete(parseInt(id))
      .pipe(first())
      .subscribe(() => {
        this.employees = { empleados: this.employees['empleados'].filter(x => x.id !== id) };
        this.isDeleting = false;
      });
  }
}
