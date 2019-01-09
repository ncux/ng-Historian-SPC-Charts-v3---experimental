import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataService } from '../../chart-data.service';
import { QueryUrlBuilderService } from '../../query-url-builder.service';

@Component({
  selector: 'app-xbar-r',
  templateUrl: './xbar-r.component.html',
  styleUrls: ['./xbar-r.component.css']
})
export class XbarRComponent implements AfterViewInit {

  canvas: any;
  ctx: any;

  tagName = '';
  chart = [];

  constructor(private elementRef: ElementRef,
              private chartDataService: ChartDataService,
              private queryUrlService: QueryUrlBuilderService) {  }

  ngAfterViewInit() {
    this.tagName = this.queryUrlService.tagName;

    this.canvas = this.elementRef.nativeElement.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.chartDataService.ChartLabels,
        datasets: [
          {
            label: this.tagName,
            data: this.chartDataService.numberValuesArray2,  //  (measured) tag values
            borderColor: '#000000',
            fill: false
          },
          {
            label: 'MEAN',
            data: this.chartDataService.MeanArray2,   // mean
            borderColor: '#008000',
            fill: false
          }
          ,
          {
            label: 'UCL',
            data: this.chartDataService.UCLarray2,  // UCL
            borderColor: '#FF0000',
            fill: false
          }
          ,
          {
            label: 'LCL',
            data: this.chartDataService.LCLarray2,   // LCL
            borderColor: '#4169E1',
            fill: false
          }
        ]
      },
      options: {
        legend: { display: true },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }],
        }
      }
    });

  }


}
