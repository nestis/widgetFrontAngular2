import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {DialogComponent} from '../common/dialog/dialog';
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'login-form',
    templateUrl: './app/components/login-form/login-form.html',
    styleUrls: ['./app/components/login-form/login-form-styles.css'],
    directives: [DialogComponent],
    pipes: [TranslatePipe]
})

export class LoginForm {
    private LANG_TOKEN = "VASSAngular2.lang";
    username:string;
    password:string;
    rememberme:boolean;
    userLang:string;
    errorMsg:any;


    // This give us the DialogComponent inside this component. If any...
    @ViewChild(DialogComponent) dialogComponent:DialogComponent;

    constructor(private _AuthService: AuthService, private _Router:Router, private _TranslateService: TranslateService) {
        this.errorMsg = {
            msg: '', title: '', button: ''
        };
    }
    ngOnInit() {
        if (localStorage.getItem(this.LANG_TOKEN) !== null) {
            this.userLang = localStorage.getItem(this.LANG_TOKEN);
            if (this.userLang === 'es') {
        document.querySelector('#langSelector').classList.add('is-checked');
            }
        }
    }
    doLogin() {
        let obj = {
            username: this.username,
            password: this.password,
            rememberMe: this.rememberme
        };
        this._AuthService.login(obj).then((res) => {
            this._Router.navigateByUrl('/home');
        }, (err) => {
            this.errorMsg = {
                msg: this._TranslateService.instant('login.dialog.msg'),
                title: this._TranslateService.instant('login.dialog.title'),
                button: this._TranslateService.instant('login.dialog.button')
            };
            this.dialogComponent.openDialog();
        });
    }

    changeLang() {
        this.userLang = this.userLang === 'en' ? 'es' : 'en';
        localStorage.setItem(this.LANG_TOKEN, this.userLang);
        this._TranslateService.use(this.userLang);
        document.querySelector('#langSelector').classList.remove('is-checked');
    }
}