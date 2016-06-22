import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'contact',
    templateUrl: './app/components/contact/contact.html',
    pipes: [TranslatePipe]
})

export class ContactPage {

}