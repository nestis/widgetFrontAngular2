// Live Data Service Definition
import {Injectable} from '@angular/core';
import {HttpClient} from '../../../services/http.client';
import {Observable} from 'rxjs/Observable';


// Annotation to make the class a service
@Injectable()
export class LiveDataService {
    private DATA_URL = 'http://jhipsterback.cfapps.io/api/graphicData';
    private AUTH_TOKEN = 'authenticationToken';

    constructor(private http: HttpClient) {
    }

    getData() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.DATA_URL).then((res) => {
                let body = res.json();
                resolve(body);
            }, (err) => {
                console.log('Error Obtaining Live Graph Data');
                reject(err);
            });
        });
        return promise;
    }
}