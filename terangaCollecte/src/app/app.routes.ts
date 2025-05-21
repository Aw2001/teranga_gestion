import { Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocauxComponent } from './components/locaux/locaux.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { LocatairesComponent } from './components/locataires/locataires.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProprietairesComponent } from './components/proprietaires/proprietaires.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { RecensementsComponent } from './components/recensements/recensements.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: AuthenticationComponent
    },
    
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [isLoggedInGuard]
    },

    {
        path: 'locaux',
        component: LocauxComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'locaux/:nicad',
        component: LocauxComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'locaux/evaluation',
        component: EvaluationComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'evaluation',
        component: EvaluationComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'locataires',
        component: LocatairesComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'parametres',
        component: ParametresComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'profil',
        component: ProfilComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'proprietaires',
        component: ProprietairesComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'recensements',
        component: RecensementsComponent,
        canActivate: [isLoggedInGuard]
    }
];
