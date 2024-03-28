import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import {  switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent  implements OnInit{


  public country?:Country;

  constructor(
    private  activatedRoute:ActivatedRoute,
    private countriesServices:CountriesService,
    private router:Router){

  }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.countriesServices.searchCountryByAlphaCode(id))
    )
    .subscribe(  country=>{
      console.log(country);

      if(!country) return this.router.navigateByUrl('');

      this.country=country;
      console.log('Tenemos un país');
      return;
    })
  }



}
