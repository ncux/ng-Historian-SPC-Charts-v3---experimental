import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.access_token}`,
  });

  tagName = '';

  // sample size and sampling frequency
  sampleSize: number;
  numberOfSamples: number;

  // chart parameters
  ChartLabels = [];   // holds TimeStamps
  stringValuesArray = [];   // holds the Values (they happen to be strings for some reason)
  numberValuesArray = [];
  TagDataObject = {};   // holds the tag values for the chart
  MeanDataObject = {};  // holds the mean values for the chart
  UCLDataObject = {};   // holds the UCL values for the chart
  LCLDataObject = {};   // holds the LCL values for the chart
  ChartDataObjectsArray = [];   // holds values for ChartData

  // Statistical Process Control parameters
  mean;
  MeanArray = [];
  standardDevivation;
  UCL;   // upper control limit
  LCL;   // lower control limit
  UCLarray = [];
  LCLarray = [];

  // factoring in the samples and sample frequency
  numberValuesArray2;
  MeanArray2 = [];
  UCLarray2 = [];
  LCLarray2 = [];

  dataQueryUrl = '';
  staticData = 'assets/data/WIN-9DBOGP80695.Simulation00052 - OG.json';   // for development only

  constructor(private http: HttpClient) { }

  getDataAndSetChartValues() {
    return this.http.get(this.staticData).subscribe(historianData => {    // switch URL to dataQueryUrl when ready for production!

      const timeStampsAndValues = historianData['Data'][0].Samples;
      // console.log(timeStampsAndValues);

      // filling the chart arrays
      timeStampsAndValues.forEach(value => {
        this.ChartLabels.push(this.simplifyTime(value.TimeStamp));
        this.stringValuesArray.push((parseInt(value.Value)).toFixed(0));
        this.numberValuesArray = this.stringValuesArray.map(item => parseInt(item));   // array of strings converted to array of numbers
        this.TagDataObject['data'] = this.numberValuesArray;
        this.TagDataObject['label'] = this.tagName;
        this.ChartDataObjectsArray.push(this.TagDataObject);   // TagDataObject is a SPC parameter; plot it

        // computing SPC parameters
        this.mean = this.meanCalculator(this.numberValuesArray);
        this.MeanArray = [...this.numberValuesArray];  // trick to correctly fill it with the mean
        this.MeanArray.fill(this.mean);
        this.MeanDataObject['data'] = this.MeanArray;
        this.MeanDataObject['label'] = 'mean';
        this.ChartDataObjectsArray.push(this.MeanDataObject);  // MeanDataObject is a SPC parameter; plot it
        this.standardDevivation = this.standardDeviationCalculator(this.numberValuesArray);

        this.UCL = this.mean + 3 * this.standardDevivation;
        this.LCL = this.mean - 3 * this.standardDevivation;

        this.UCLarray = [...this.numberValuesArray];
        this.UCLarray.fill(this.UCL);

        this.LCLarray = [...this.numberValuesArray];
        this.LCLarray.fill(this.LCL);

        this.UCLDataObject['data'] = this.UCLarray;
        this.UCLDataObject['label'] = 'UCL';

        this.LCLDataObject['data'] = this.LCLarray;
        this.LCLDataObject['label'] = 'LCL';

        this.ChartDataObjectsArray.push(this.UCLDataObject);  // UCLDataObject is a SPC parameter; plot it
        this.ChartDataObjectsArray.push(this.LCLDataObject);  // LCLDataObject is a SPC parameter; plot it

        if (this.sampleSize > 1) {
          this.numberValuesArray2 = [...this.numberValuesArray];
          this.numberValuesArray2 = this.numberValuesArray2.fill().map(() => Math.round(Math.random() * 100000));
        } else {
          this.numberValuesArray2 = [...this.numberValuesArray];
        }

        if (this.numberOfSamples > 1) {
          this.MeanArray2 = [...this.MeanArray];
          this.MeanArray2.fill(this.getRandomNumber(75000, 50000));       //  (75000, 50000)
          this.UCLarray2 = [...this.UCLarray];
          this.UCLarray2.fill(this.getRandomNumber(115000, 90000));      //   (120000, 100000)
          this.LCLarray2 = [...this.LCLarray];
          this.LCLarray2.fill(this.getRandomNumber(40000, 20000));        //    (45000, 20000)
        } else {
          this.MeanArray2 = [...this.MeanArray];
          this.UCLarray2 = [...this.UCLarray];
          this.LCLarray2 = [...this.LCLarray];
        }

      });

    });

  }

  simplifyTime = timestamp => timestamp.slice(0, 16);  // trims off the seconds and milliseconds

  meanCalculator = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  standardDeviationCalculator(values) {
    const mean = this.meanCalculator(values);
    const squareDifferences = values.map(value => {
      const difference = value - mean;
      return difference ** 2;
    });

    const meanSquareDifference = this.meanCalculator(squareDifferences);
    return Math.sqrt(meanSquareDifference);  // standard deviation
  }

  getRandomNumber = (min, max) => ((max - min) * Math.random()) + min;


}
