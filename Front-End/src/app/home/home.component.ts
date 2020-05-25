import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {formatDate} from '@angular/common';
import { PrenotaRilascioService } from '../prenota-rilascio.service';
import { Prenotazione } from '../prenotazione.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bici = 1;
  currLat: any;
  currLng: number;
  data: Object;
  loading: boolean;
  o :Observable<Object>;
  myDate: any;
  myTime: any;
  myDate2: any;
  myTime2: any;
  constructor(public http: HttpClient, private service: PrenotaRilascioService) {}

  ngOnInit(): void {
    this.o = this.http.get('https://3000-b9d1e6b4-2a0d-442f-bac9-b0dcf7bdc9cf.ws-eu01.gitpod.io/users/search/7'); //per fare finta di esseri già loggato
    this.o.subscribe(data => {
      console.log(data);
      this.data = data;
      if (this.data[0].IdBici != null && this.data[0].Datarilascio === null) {
        this.loading = true;
      }
    });

  }
//tramite la funzione getCurrentLocation si ottiene le coordinate del dispositivo
//permette di verificare se funziona la geolocalizzazione tramite browser

 getCurrentLocation() : void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat, this.currLng);
        this.loading = true;
        this.myDate = formatDate(new Date (), 'yyyy/MM/dd', 'en'); //prende la data corrente e formattarlo come indicato nel db
        this.myTime = formatDate(new Date (), 'HH:mm:ss', 'en'); //prende l'ora correntee formattarlo nella zona giusta
        console.log(this.myDate, this.myTime);
        this.service.sendDataPrenota(this.data[0].IdUtente, this.bici, this.currLat, this.currLng, this.myDate, this.myTime)
      });
    }
    else {
      alert("Geolocalizzazione non supportato dal browser");
    }
  }
   getCurrentLocationRilascio() : void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat, this.currLng);
        this.myDate2 = formatDate(new Date (), 'yyyy/MM/dd', 'en');
        this.myTime2 = formatDate(new Date (), 'HH:mm:ss', 'en');
        console.log(this.myDate2, this.myTime2);
        this.service.sendDataRilascio(this.data[0].IdUtente, this.bici, this.myDate, this.myTime, this.currLat, this.currLng, this.myDate2, this.myTime2);
        this.loading = false;
      });
    }
    else {
      alert("Geolocalizzazione non supportato dal browser");
    }
}
}
