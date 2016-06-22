import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'my-greeting',
    templateUrl: './app/components/home/components/my-greeting/my-greeting.html',
    pipes: [TranslatePipe]
})

export class MyGreetingComponent {
    greeting:string;
    constructor() {
        this.greeting = "Welcome!";
    }
}