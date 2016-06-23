import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from '../../../services/auth.service';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: '[header-component]',
    templateUrl: './app/components/common/header/header.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class Header {
    private LANG_TOKEN = "VASSAngular2.lang";
    userLang:string;
    username:string;

    constructor(private _AuthService: AuthService, private _TranslateService: TranslateService, private _Router: Router) {
        if (localStorage.getItem(this.LANG_TOKEN) !== null) {
            this.userLang = localStorage.getItem(this.LANG_TOKEN);
        } else {
            this.userLang = navigator.language.split('-')[0];
            this.userLang = /(fr|en)/gi.test(this.userLang) ? this.userLang : 'en';
        }
        if (_AuthService.isAuthenticated()) {
            let identity = _AuthService.getIdentity();
            this.username = identity.lastName;
        }
    }

    changeLang() {
        this.userLang = this.userLang === 'en' ? 'es' : 'en';
        this._TranslateService.use(this.userLang);
    }

    doLogout() {
        this._AuthService.logout().then((res) => {
            this._Router.navigateByUrl('/login');
        }, (err) => {
            this._Router.navigateByUrl('/login');
        });
    }
}