import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currLat: any;
  currLng: number;
  data: Object;
  loading: boolean;
  o :Observable<Object>;

  myDate = formatDate(new Date (), 'yyyy/MM/dd', 'en'); //prende la data corrente e formattarlo come indicato nel db
  myTime = formatDate(new Date (), 'HH:mm:ss', 'en'); //prende l'ora correntee formattarlo nella zona giusta

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.o = this.http.get('https://3000-b9d1e6b4-2a0d-442f-bac9-b0dcf7bdc9cf.ws-eu01.gitpod.io/users/search/1'); //per fare finta di esseri già loggato
    this.o.subscribe(data => {
      this.data = data;
    });
  }
//tramite la funzione getCurrentLocation si ottiene le coordinate del dispositivo
//permette di verificare se funziona la geolocalizzazione tramite browser

 getCurrentLocation() : void {
    console.log(this.myDate, this.myTime);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat, this.currLng);
        this.loading = true;
      });
    }
    else {
      alert("Geolocalizzazione non supportato dal browser");
    }
  }

}
