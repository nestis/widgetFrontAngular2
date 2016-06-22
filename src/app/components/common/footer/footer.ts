import {Component} from '@angular/core';
import {RouterLink} from "@angular/router-deprecated";

@Component({
    selector: 'footer',
    templateUrl: './app/components/common/footer/footer.html',
    directives: [RouterLink]
})

export class Footer {}