import {Component, OnInit} from "@angular/core";
import {LoginForm} from './components/login-form/login-form';

declare var componentHandler: any;

@Component({
    selector: "[login]",
    templateUrl: "./app/login.html",
    directives: [LoginForm]
})

export class LoginComponent implements OnInit {

    ngOnInit() {
        console.log("Application component initialized MDL...");
        // Update MDL components...
        componentHandler.upgradeAllRegistered();
    }
}