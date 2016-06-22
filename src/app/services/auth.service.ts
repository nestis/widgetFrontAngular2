// Auth Service Definition
import {Injectable} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient} from './http.client';
import {Observable} from 'rxjs/Observable';

// Annotation to make the class a service
@Injectable()
export class AuthService {
    private LOGOUT_URL = 'http://jhipsterback.cfapps.io/api/logout';
    private LOGIN_URL = 'http://jhipsterback.cfapps.io/api/authenticate';
    private ACCOUNT_URL = 'http://jhipsterback.cfapps.io/api/account';
    private AUTH_TOKEN = 'authenticationToken';
    private identity;
    private promiseIdentity:Promise<any>;

    constructor(private http: Http, private router: Router, private httpClient: HttpClient) {
        this.identity = null;
        this.fetchIdentity();
    }

    isAuthenticated():Promise<boolean> {
        let promise = new Promise((resolve, reject) => {
            if (this.identity === null) {
                this.fetchIdentity().then((res) => {
                    resolve(true);
                }, (err) => {
                    resolve(false);
                });
            } else {
                resolve(true);
            }
        });
        return promise;
    }
    getIdentity() {
        return this.identity;
    }

    login(obj):Promise<string> {
        let promise = new Promise((resolve, reject) => {
            this.httpClient.post(this.LOGIN_URL, JSON.stringify(obj)).then((res) => {
                // If the user clicked RememberMe, save the auth toekn on local storage
                if (obj.rememberMe) {
                    localStorage.setItem(this.AUTH_TOKEN, res.body.id_token);
                } else {
                    sessionStorage.setItem(this.AUTH_TOKEN, res.body.id_token);
                }
                this.fetchIdentity().then((res) => {
                    resolve();
                }, (err) => {
                    reject();
                });
            }, (err) => {
                console.log('Error login');
                reject(err);
            });
        });
        return promise;
    }

    logout():Promise<string> {
        let promise = new Promise((resolve, reject) => {
            this.httpClient.get(this.LOGOUT_URL).then((res) => {
                    localStorage.removeItem(this.AUTH_TOKEN);
                    sessionStorage.removeItem(this.AUTH_TOKEN);
                    resolve();
                }, (err) => {
                    console.error('An error occurred while logging out', err);
                    localStorage.removeItem(this.AUTH_TOKEN);
                    sessionStorage.removeItem(this.AUTH_TOKEN);
                    resolve();
                    this.router.navigateByUrl('/login');
                });
            });
        return promise;
    }

    fetchIdentity():Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.httpClient.get(this.ACCOUNT_URL).then((res) => {
                    let body = res.body;
                    this.identity = body;
                    resolve();
                }, (err) => {
                    console.error('An error occurred while obtaining account info', err);
                    reject();
            });
        });
        return promise;
    }
}
