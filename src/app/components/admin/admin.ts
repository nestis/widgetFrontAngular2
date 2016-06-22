import {Component} from '@angular/core';
import {LiveDataGraphComponent} from './component/live-data-graph/live-data-graph';

@Component({
    selector: 'admin',
    templateUrl: './app/components/admin/admin.html',
    directives: [LiveDataGraphComponent]
})

export class AdminPage {
}