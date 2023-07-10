import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, SubsidiaryService } from '@app/_services';
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subsidiaryService: SubsidiaryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      razonSocial: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.title = 'Crear Subsidiaria';
    if (this.id) {
      // edit mode
      console.log(this.id);
      this.title = 'Editar Subsidiaria';
      this.loading = true;
      this.subsidiaryService.find(this.id)
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
          this.router.navigateByUrl('/subsidiaries');
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
      ? this.subsidiaryService.update(this.id, this.form.value)
      : this.subsidiaryService.create(this.form.value);
  }
}
