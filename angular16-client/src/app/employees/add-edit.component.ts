import { Component, OnInit } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeeService, AlertService } from '@app/_services';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink]
})
export class AddEditComponent implements OnInit {
  
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private employeeService: EmployeeService,
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
          
      });

      this.title = 'Crear Usuario';
      if (this.id) {
          // edit mode
          this.title = 'Editar Usuario';
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
                  this.alertService.success('User saved', true);
                  this.router.navigateByUrl('/users');
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
