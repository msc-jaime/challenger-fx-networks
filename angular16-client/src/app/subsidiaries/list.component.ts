import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';
import { SubsidiaryService } from '@app/_services';
import { Subsidiaries } from '@app/_models';

@Component({
  templateUrl: './list.component.html',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf]
})
export class ListComponent {
  subsidiaries!: Subsidiaries;
  isDeleting = false;

  constructor(private subsidiaryService: SubsidiaryService) { }

  ngOnInit() {
    this.subsidiaryService.getAll()
      .pipe(first())
      .subscribe(subsidiaries => this.subsidiaries = subsidiaries);
  }

  deleteEmployee(id: string) {
    this.isDeleting = true;
    this.subsidiaryService.delete(parseInt(id))
      .pipe(first())
      .subscribe(() => {
        this.subsidiaries = { subsidiarias: this.subsidiaries['subsidiarias'].filter(x => x.id !== id) };
        this.isDeleting = false;
      });
  }
}
