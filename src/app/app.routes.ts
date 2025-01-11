import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { Error404Component } from './pages/error404/error404.component';
import { FigureListComponent } from './pages/figure-list/figure-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'hola-mundo', component: HelloWorldComponent },
    { path: '**', component: Error404Component },
    { path: 'modelos', component: FigureListComponent },
    { path: 'usuarios', component: UserListComponent },
    { path: 'login', component: LoginGoogleComponent }
];
