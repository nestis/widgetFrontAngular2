// Main application component
import {Component, OnInit} from "@angular/core";
import {Router, RouteConfig, RouterLink, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {TranslateService} from 'ng2-translate/ng2-translate';

// Import Custom components and services
import {LoginComponent} from './login.component';
import {HomeComponent} from "./home.component";
import {AuthService} from './services/auth.service';

declare var componentHandler: any;

@Component({
    selector: "[app]",
    templateUrl: "./app/app.html",
    directives: [LoginComponent, HomeComponent, RouterLink, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/login', component: LoginComponent, as: 'Login', useAsDefault: true},
    // If we want to define new routes on the component, we need to use the syntax /url/...
    {path: '/home/...', component: HomeComponent, as: 'Home'}
])

export class AppComponent implements OnInit {
    private LANG_TOKEN = "VASSAngular2.lang";
    userLang:string;

    constructor(private _AuthService: AuthService, private _Router: Router, private _TranslateService: TranslateService) {
        if (localStorage.getItem(this.LANG_TOKEN) !== null) {
            this.userLang = localStorage.getItem(this.LANG_TOKEN);
        } else {
            this.userLang = navigator.language.split('-')[0];
            this.userLang = /(fr|en)/gi.test(this.userLang) ? this.userLang : 'en';
            localStorage.setItem(this.LANG_TOKEN, this.userLang);
        }
        this._TranslateService.setDefaultLang('en');
        this._TranslateService.use(this.userLang);
    }

    ngOnInit() {
        console.log("Application component initialized MDL...");
        // Update MDL components...
        componentHandler.upgradeAllRegistered();
        this._AuthService.isAuthenticated().then((res) => {
            if (res) {
                this._Router.navigateByUrl('/home');
            }
        });
    }
}