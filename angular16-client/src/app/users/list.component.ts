
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';
import { Users } from '@app/_models';

import { AuthService } from '@app/_services';

@Component({
    templateUrl: 'list.component.html',
    standalone: true,
    imports: [RouterLink, NgFor, NgIf]
})
export class ListComponent implements OnInit {
    users!: Users;
    isDeleting = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.getAll()
            .pipe(first())
            .subscribe(users => { this.users = users});

    }

    deleteUser(id: string) {
        this.isDeleting = true;
        console.log("delete User");
        console.log(id);
        this.authService.delete(id)
            .pipe(first())
            .subscribe(() => {
                console.log("ok");
                this.users = { users: this.users['users'].filter(x => x.id !== id) };

                this.isDeleting = false;
            });
    }
}