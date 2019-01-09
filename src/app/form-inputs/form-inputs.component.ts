import { AfterContentInit, Component, ElementRef, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TagsService } from '../tags.service';
import { QueryUrlBuilderService } from '../query-url-builder.service';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-form-inputs',
  templateUrl: './form-inputs.component.html',
  styleUrls: ['./form-inputs.component.css']
})
export class FormInputsComponent implements AfterContentInit {

  today = String(Date.now());
  startDate = '2019-01-08';

  tagsListArray: any[] = [];

  constructor(
      private elementRef: ElementRef,
      private tagsGetterService: TagsService,
      private queryUrlService: QueryUrlBuilderService,
      private chartDataService: ChartDataService
      ) { }

  ngAfterContentInit() {
    this.getTags();
    this.elementRef.nativeElement.querySelector('#endDate').defaultValue = this.today;
  }


  getTags() {
    this.tagsGetterService.getAllTags();
    this.tagsListArray = this.tagsGetterService.tagsArray;
  }


  plot(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log(form.value);       //  checking individual inputs
    console.log(form.value.tag);

    this.queryUrlService.tagName = form.value.tag;
    this.queryUrlService.startDateValue = form.value.startDate;
    this.queryUrlService.startTimeValue = form.value.startTime;
    this.queryUrlService.endDateValue = form.value.endDate;
    this.queryUrlService.endTimeValue = form.value.endTime;
    this.queryUrlService.calcModeValue = form.value.calcMode;
    this.queryUrlService.countValue = form.value.count;
    this.queryUrlService.intervalValue = form.value.interval;
    this.chartDataService.sampleSize = form.value.sampleSize;
    this.chartDataService.numberOfSamples = form.value.numberOfSamples;

    this.queryUrlService.buildQueryUrl();
    this.elementRef.nativeElement.querySelector('#nav-container').style.display = 'block';
  }


}
