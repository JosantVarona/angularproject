import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { Error404Component } from './pages/error404/error404.component';
import { FigureListComponent } from './pages/figure-list/figure-list.component';
import { FigureAddComponent } from './pages/figure-add/figure-add.component';
import { FigureEditComponent } from './pages/figure-edit/figure-edit.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { ApiList } from './pages/api-use/api-use.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'hola-mundo', component: HelloWorldComponent },
    { path: 'modelos', component: FigureListComponent }, 
    { path: 'usuarios', component: UserListComponent }, 
    { path: 'login', component: LoginGoogleComponent },
    { path: 'modelos/anadir', component: FigureAddComponent },
    { path: 'modelos/editar/:id', component: FigureEditComponent },
    { path: 'usuarios/anadir', component: UserAddComponent },
    { path: 'api', component: ApiList },
    { path: 'usuarios/editar/:id', component: UserEditComponent },
    { path: '**', component: Error404Component }
];