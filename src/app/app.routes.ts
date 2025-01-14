import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { Error404Component } from './pages/error404/error404.component';
import { FigureListComponent } from './pages/figure-list/figure-list.component';
import { FigureAddComponent } from './pages/figure-add/figure-add.component';
import { FigureEditComponent } from './pages/figure-edit/figure-edit.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'hola-mundo', component: HelloWorldComponent },
    { path: 'modelos', component: FigureListComponent, canActivate: [AuthGuard]  },
    { path: 'usuarios', component: UserListComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginGoogleComponent },
    { path: 'modelos/anadir', component: FigureAddComponent, canActivate: [AuthGuard]  },
    { path: 'modelos/editar/:id', component: FigureEditComponent, canActivate: [AuthGuard]  },
    { path: 'usuarios/anadir', component: UserAddComponent, canActivate: [AuthGuard]  },
    { path: 'usuarios/editar/:id', component: UserEditComponent, canActivate: [AuthGuard]  },
    { path: '**', component: Error404Component }
];