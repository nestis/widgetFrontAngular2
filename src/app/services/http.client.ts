import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {
    private http:Http;
    private AUTH_TOKEN = 'authenticationToken';

    constructor(http: Http) {
        this.http = http;
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json');

        let authToken = localStorage.getItem(this.AUTH_TOKEN);
        if (authToken === null) {
            authToken = sessionStorage.getItem(this.AUTH_TOKEN);
        }
        if (authToken !== null) {
            headers.append('Authorization', 'Bearer ' + authToken);
        }
    }

    get(url):Promise<any> {
        let promise = new Promise( (resolve, reject) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            this.http.get(url, {headers: headers}).toPromise().then((res:any) => {
                let obj = JSON.parse(res._body);
                res.body = obj;
                resolve(res);
            }, (err) => {
                let obj = JSON.parse(err._body);
                err.body = obj;
                reject(err);
            });
        });
        return promise;
    }

    post(url, data):Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this.http.post(url, data, {headers: headers}).toPromise().then((res:any) => {
                let obj = JSON.parse(res._body);
                res.body = obj;
                resolve(res);
            }, (err) => {
                let obj = JSON.parse(err._body);
                err.body = obj;
                reject(err);
            });
        });
        return promise;
    }
}