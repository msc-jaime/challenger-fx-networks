import { Routes } from "@angular/router";

import { HomeComponent } from './home';
import { LoginComponent, RegisterComponent } from './account';
import { authGuard } from './_helpers';

import { ListComponent as EmployeesListComponent} from './employees/list.component';
import { AddEditComponent as EmployeesEditComponent} from './employees/add-edit.component';
import { ListComponent as SubsidiariesListComponent} from './subsidiaries/list.component';
import { AddEditComponent as SubsidiariesAddEditComponent } from './subsidiaries/add-edit.component';
import { ListComponent as UsersListComponent} from './users/list.component';
import { AddComponent as UsersAddEditComponent } from './users/add.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },

    { path: 'employees', component: EmployeesListComponent, canActivate: [authGuard]  },
    { path: 'employees/add', component: EmployeesEditComponent, canActivate: [authGuard]  },
    { path: 'employees/edit/:id', component: EmployeesEditComponent, canActivate: [authGuard]  },
    { path: 'subsidiaries', component: SubsidiariesListComponent, canActivate: [authGuard]  },
    { path: 'subsidiaries/add', component: SubsidiariesAddEditComponent, canActivate: [authGuard]  },
    { path: 'subsidiaries/edit/:id', component: SubsidiariesAddEditComponent, canActivate: [authGuard]  },
    { path: 'users', component: UsersListComponent, canActivate: [authGuard]  },
    { path: 'users/add', component: UsersAddEditComponent, canActivate: [authGuard]  },
    //{ path: 'users/edit/:id', component: UsersAddEditComponent, canActivate: [authGuard]  },
    
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
