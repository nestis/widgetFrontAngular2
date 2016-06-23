/* Avoid: 'error TS2304: Cannot find name <type>' during compilation */
///<reference path="../../typings/index.d.ts"/>

// Init application file
import {AppComponent} from "./app.component";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {TRANSLATE_PROVIDERS, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {APP_ROUTER_PROVIDERS} from './app.routes';

// Import a few components to help us deal with http requests
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {AuthService, HttpClient} from './services/common.services';
import {LiveDataService} from './components/admin/services/livedata.service';

bootstrap(AppComponent, [
    HTTP_PROVIDERS, TRANSLATE_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    AuthService, HttpClient, LiveDataService,

    // For now, only static provider is available. We cannot have json files per component.
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'app/i18n', '.json'),
        deps: [Http]
    }),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);