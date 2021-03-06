import { Component, ElementRef, OnInit } from '@angular/core';
import { QueryUrlBuilderService } from '../../query-url-builder.service';
import { ChartDataService } from '../../chart-data.service';

@Component({
  selector: 'app-xbar-r-table',
  templateUrl: './xbar-r-table.component.html',
  styleUrls: ['./xbar-r-table.component.css']
})
export class XbarRTableComponent implements OnInit {

  // sample size and sampling frequency
  sampleSize: number;
  numberOfSamples: number;

  table1;
  table2;
  table3;
  table4;
  table5;
  tagName = '';
  tableData = [];

  constructor(private chartDataService: ChartDataService,
              private elementRef: ElementRef,
              private queryUrlService: QueryUrlBuilderService) { }

  ngOnInit() {
    this.tagName = this.queryUrlService.tagName;
    this.sampleSize = this.chartDataService.sampleSize;
    this.numberOfSamples = this.chartDataService.numberOfSamples;

    if (this.sampleSize > 1) {
      this.tableData.push(this.chartDataService.ChartLabels, this.chartDataService.numberValuesArray2, this.chartDataService.LCLarray2, this.chartDataService.MeanArray2, this.chartDataService.UCLarray2);
    } else {
      this.tableData.push(this.chartDataService.ChartLabels, this.chartDataService.numberValuesArray, this.chartDataService.LCLarray, this.chartDataService.MeanArray, this.chartDataService.UCLarray);
    }

    if (this.numberOfSamples > 1) {
      this.tableData.push(this.chartDataService.ChartLabels, this.chartDataService.numberValuesArray2, this.chartDataService.LCLarray2, this.chartDataService.MeanArray2, this.chartDataService.UCLarray2);
    } else {
      this.tableData.push(this.chartDataService.ChartLabels, this.chartDataService.numberValuesArray, this.chartDataService.LCLarray, this.chartDataService.MeanArray, this.chartDataService.UCLarray);
    }

    this.createTable();
  }

  createTable() {
    this.table1 = this.elementRef.nativeElement.querySelector('#table1');
    this.tableData[0].forEach(timestamp => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${timestamp}</td>`;
      this.table1.append(row);
    });

    this.table2 = this.elementRef.nativeElement.querySelector('#table2');
    this.tableData[1].forEach(value => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${value}</td>`;
      this.table2.append(row);
    });

    this.table3 = this.elementRef.nativeElement.querySelector('#table3');
    this.tableData[2].forEach(LCL => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${LCL.toFixed(0)}</td>`;
      this.table3.append(row);
    });

    this.table4 = this.elementRef.nativeElement.querySelector('#table4');
    this.tableData[3].forEach(mean => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${mean.toFixed(0)}</td>`;
      this.table4.append(row);
    });

    this.table5 = this.elementRef.nativeElement.querySelector('#table5');
    this.tableData[4].forEach(UCL => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${UCL.toFixed(0)}</td>`;
      this.table5.append(row);
    });
  }

}
