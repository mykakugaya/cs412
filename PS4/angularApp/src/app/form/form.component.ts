import { Component, OnInit } from '@angular/core';
import { CovidApiService } from './covidApi.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private covidApiService: CovidApiService) { }

  country: string = "";
  // submitted: boolean = false;
  response: string = "";

  ngOnInit(): void {
    // if (this.submitted) {
    //   this.covidApiService.getCountry(this.country).subscribe(
    //     response => {
    //       console.log(`Country: ${this.country}`);
    //       console.log(`Covid Stats: ${response}`);
    //     }
    //   )
    // }
  }

  onSubmit() {
    this.covidApiService.getCountry(this.country).subscribe(
      response => {
        console.log(`Country: ${this.country}`);
        // parse response data
        this.response = JSON.stringify(response);
        console.log(`${this.response}`);
      }
    )
  }

}
