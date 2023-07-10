import { Component, OnInit } from '@angular/core';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeeService, AlertService, SubsidiaryService } from '@app/_services';
import { Subsidiaries } from '@app/_models';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, RouterLink]
})
export class AddEditComponent implements OnInit {
  
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  subsidiaries!: Subsidiaries;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private employeeService: EmployeeService,
      private subsidiaryService: SubsidiaryService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];

      // form with validation rules
      this.form = this.formBuilder.group({
          nombre: ['', Validators.required],
          cedula: ['', Validators.required],
          fechaContratacion: ['', Validators.required],
          puesto: ['', Validators.required],
          oficina: ['', Validators.required],
          subsidiariaId: ['', Validators.required]
      });

      this.subsidiaryService.getAll()
        .pipe(first())
        .subscribe(subsidiaries => this.subsidiaries = subsidiaries);

      this.title = 'Crear Empleado';
      if (this.id) {
          // edit mode
          console.log(this.id);
          this.title = 'Editar Empleado';
          this.loading = true;
          this.employeeService.find(this.id)
              .pipe(first())
              .subscribe(x => {
                  this.form.patchValue(x);
                  this.loading = false;
              });
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      console.log(this.form.value);

      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.submitting = true;
      console.log(this.form.value);
      this.saveUser()
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Employees saved', true);
                  this.router.navigateByUrl('/employees');
              },
              error: error => {
                  this.alertService.error(error);
                  this.submitting = false;
              }
          })
  }

  private saveUser() {
      // create or update user based on id param
      return this.id
          ? this.employeeService.update(this.id, this.form.value)
          : this.employeeService.create(this.form.value);
  }

}
