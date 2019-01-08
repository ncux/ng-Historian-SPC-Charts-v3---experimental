import {Component, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { QueryUrlBuilderService } from '../../query-url-builder.service';
import { ChartDataService } from '../../chart-data.service';


@Component({
  selector: 'app-ixmr',
  templateUrl: './ixmr.component.html',
  styleUrls: ['./ixmr.component.css']
})
export class IXMRComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
