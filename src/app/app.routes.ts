import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { Error404Component } from './pages/error404/error404.component';
import { FigureListComponent } from './pages/figure-list/figure-list.component';
import { FigureAddComponent } from './pages/figure-add/figure-add.component';
import { FigureEditComponent } from './pages/figure-edit/figure-edit.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { RandomAdComponent } from './pages/random-ad/random-ad.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'hola-mundo', component: HelloWorldComponent },
    { path: 'modelos', component: FigureListComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginGoogleComponent },
    { path: 'modelos/anadir', component: FigureAddComponent, canActivate: [AuthGuard]  },
    { path: 'modelos/editar/:id', component: FigureEditComponent, canActivate: [AuthGuard]  },
    { path: 'api', component:RandomAdComponent},
    { path: '**', component: Error404Component }
];
