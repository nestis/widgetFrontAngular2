import {Component, OnInit} from "@angular/core";
import {Router, RouteConfig, RouterLink, ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {HomePage} from './components/home/home';
import {AdminPage} from './components/admin/admin';
import {ContactPage} from './components/contact/contact';

// Common components
import {Menu} from './components/common/menu/menu';
import {Header} from './components/common/header/header';
import {Footer} from './components/common/footer/footer';
import {AuthService} from './services/auth.service';

declare var componentHandler: any;

@Component({
    selector: "[home]",
    templateUrl: "./app/home.html",
    directives: [Menu, Footer, Header, RouterLink, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: HomePage, as:'Home', useAsDefault: true},
    {path: '/admin', component: AdminPage, as:'Admin'},
    {path: '/contact', component: ContactPage, as: 'Contact'}
])

export class HomeComponent implements OnInit {
    // Service injections must be here
    constructor(private _AuthService: AuthService, private _Router: Router) {
    }

    ngOnInit() {
        if (this._AuthService.isAuthenticated()) {
            console.log("Initiating home component");
            // Update MDL components...
            componentHandler.upgradeAllRegistered();
        } else {
            this._Router.navigateByUrl('/login');
        }
    }
}