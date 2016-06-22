import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'my-list',
    templateUrl: './app/components/home/components/my-list/my-list.html',
    pipes: [TranslatePipe]
})

export class MyListComponent {
    items:string[];

    constructor() {
        this.items = [
            'Responsive Web App boilerplate',
            'Iron Elements and Paper Elements',
            'End-to-end Build Tooling (including Vulcanize)',
            'Unit testing with Web Component Tester',
            'Routing with Page.js',
            'Offline support with the Platinum Service Worker Elements'
        ];
    }
}