import {Component} from '@angular/core';
import {MyGreetingComponent} from './components/my-greeting/my-greeting';
import {MyListComponent} from './components/my-list/my-list';

@Component({
    selector:'home',
    templateUrl: './app/components/home/home.html',
    directives: [MyGreetingComponent, MyListComponent]
})

export class HomePage {
}