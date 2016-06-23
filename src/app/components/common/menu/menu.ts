import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {AuthService} from '../../../services/auth.service';
@Component({
    selector: '[menu-component]',
    templateUrl: './app/components/common/menu/menu.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class Menu {
    roles: [string];

    constructor(_AuthService:AuthService) {
        let identity = _AuthService.getIdentity();
        this.roles = identity.authorities;
    }

    isAdmin():boolean {
        return this.roles.indexOf('ROLE_ADMIN') >= 0;
    }
}