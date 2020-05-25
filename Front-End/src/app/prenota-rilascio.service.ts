import { Injectable } from '@angular/core';
import { Prenotazione } from './prenotazione.model';
import { Rilascio } from './rilascio.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PrenotaRilascioService {

  constructor(private http: HttpClient) { }
  data: any;

  sendDataPrenota( id: number,  idBici: number,  lat: number,  lng: number,  dataInizio: string,  oraInizio: string){
    let p = new Prenotazione(id, idBici, lat, lng, dataInizio, oraInizio);
    this.http.post('https://3000-b9d1e6b4-2a0d-442f-bac9-b0dcf7bdc9cf.ws-eu01.gitpod.io/users/', p).subscribe(data=>{console.log(data)});
  }

  sendDataRilascio(id: number, idBici: number, dataInizio:string, oraInizio: string, lat: number,  lng: number,  dataFine: string,  oraFine: string){
    let r = new Rilascio(id, idBici, dataInizio, oraInizio, lat, lng, dataFine, oraFine);
    this.http.post('https://3000-b9d1e6b4-2a0d-442f-bac9-b0dcf7bdc9cf.ws-eu01.gitpod.io/users/1', r).subscribe(data=>{console.log(data)});
  }
}
