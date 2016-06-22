import {Component, AfterViewChecked} from '@angular/core';
import {LiveDataService} from '../../services/livedata.service';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Highcharts, CHART_DIRECTIVES} from 'angular2-highcharts';

@Component({
    selector: 'live-graph-data',
    templateUrl: './app/components/admin/component/live-data-graph/live-data-graph.html',
    pipes: [TranslatePipe],
    directives: [CHART_DIRECTIVES]
})

export class LiveDataGraphComponent {

    constructor(private _LiveDataService: LiveDataService) {
        this.options = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg,
                marginRight: 10
            },
            series: [{ data: [2, 3, 5, 8, 13] }],
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            }
        };
    }

    ngOnInit() {
        var self = this;
        setInterval(() => {
            self._LiveDataService.getData().then((res: string) => {
                self.chart.series[0].addPoint(parseInt(res, 10));
            });
        }, 1000);
    }
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    };

    ngOnDestroy() {
        // viewChild is updated after the view has been checked
        console.log('AfterViewChecked: ');
        clearInterval(this.interval);
    }
    chart: any;
    options: Object;
    interval: any;
}