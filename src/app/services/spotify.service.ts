import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas: any[] = [];

  urlSpotify: string = 'https://api.spotify.com/v1/';
  token: string = 'BQDNjVkn_GX8AmvNjdtP9-Oij0cfbcF3x5YeLH-2Kv38nVV4voi9e7SdMopCKEHbD58SdeME3a9PrKQY-WE';
  constructor( public http:HttpClient) {
    //console.log("Servicio Spotify");
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    });
    return headers;
  }

  getTop( id: string ) {

    let url = `${ this.urlSpotify }artists/${ id }/top-tracks?country=US`;

    return this.http.get(url, {headers:this.getHeaders()});

  }

  getArtista( id: string ) {
    let url = `${ this.urlSpotify }artists/${ id }`;

    return this.http.get(url, {headers:this.getHeaders()})
              //  .map( (resp:any) => {
              //    this.artistas = resp.artists.items;
              //    return this.artistas;
              // });
  }

  getArtistas(termino: string){
    let url = `${ this.urlSpotify }search?query=${ termino }&type=artist&offset=0&limit=20`;
    let headers = this.getHeaders();
    return this.http.get(url, {headers:headers})
               .map( (resp:any) => {
                 this.artistas = resp.artists.items;
                 return this.artistas;
              });

  }
}
