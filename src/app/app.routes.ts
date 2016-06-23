import {provideRouter, RouterConfig}  from '@angular/router';
import {LoginComponent} from './login.component';
import {HomeComponent} from "./home.component";
import {HomeRoutes} from './home.routes';

export const AppRoutes: RouterConfig = [
    {path: '',
        redirectTo: '/home',
        terminal: true
    },
    {path: 'login', component: LoginComponent},
    // If we want to define new routes on the component, we need to use the syntax /url/...
    {path: 'home', component: HomeComponent, children: HomeRoutes}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(AppRoutes)
];
