// Dialog component definition.
// It's an Angular component because we need to perform some plain javascript logic on the html
// when it's on the DOM. Since Angular2 uses dynamic components, the only solution it's to perform
// this logic inside an Angular component.
import {Component, AfterViewChecked, ElementRef, Input} from '@angular/core';

@Component({
    selector: '[dialog-component]',
    templateUrl: './app/components/common/dialog/dialog.html'
})
export class DialogComponent implements AfterViewChecked {

    @Input() msg:string;
    @Input() title:string;
    @Input() button:string;
    dialog:any;

    // ElementRef will give us a reference to the native HTML object of this component
    constructor(private element:ElementRef) {
    }

    // Exposes method to open the dialog
    openDialog() {
        this.dialog.showModal();
    }

    // Once the HTML is on the DOM, perform javascript logic.
    ngAfterViewChecked() {
        // Only register the event once
        if (this.dialog === undefined) {
            // Access the dialog element inside this component
            this.dialog = this.element.nativeElement.querySelector('dialog');
            var vm = this;
            this.dialog.querySelector('.close').addEventListener('click', function(event:any) {
                vm.dialog.close();
            });
        }
    }
}