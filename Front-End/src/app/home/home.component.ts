import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
  }

  currLat: number;
  currLng: number;
  data: Object;
  loading: boolean;
  loading2: boolean;
  o :Observable<Object>;

  makeRequest(): void {
     console.log("here");
     this.loading = true;
     this.o = this.http.get('https://my-json-server.typicode.com/Wu-Chong/Prova/db');
     this.o.subscribe(this.getData);
   }
   getData = (d : Object) =>
   {
     this.data = new Object(d);
     this.loading = false;
   }


//tramite la funzione getCurrentLocation si ottiene le coordinate del dispositivo
//permette di verificare se funziona la geolocalizzazione tramite browser
 getCurrentLocation() : void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat, this.currLng);
        this.loading2 = true;
      });
    }
    else {
      alert("Geolocalizzazione non supportato dal browser");
    }
  }

}
