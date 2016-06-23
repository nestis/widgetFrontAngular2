import { provideRouter, RouterConfig }  from '@angular/router';
import {HomePage} from './components/home/home';
import {AdminPage} from './components/admin/admin';
import {ContactPage} from './components/contact/contact';

export const HomeRoutes: RouterConfig = [
    {path: '', component: HomePage},
    {path: 'Admin', component: AdminPage},
    {path: 'Contact', component: ContactPage}
];
