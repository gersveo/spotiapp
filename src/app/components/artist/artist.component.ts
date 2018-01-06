import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service'

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  artista: any = {};
  tracks: any = [];
  constructor( private activatedRoute:ActivatedRoute,
               public _spoty: SpotifyService ) { }

  ngOnInit() {
    this.activatedRoute.params
          .map( params => params.id )
          .subscribe( id_artist => {
            this._spoty.getArtista(id_artist)
                  .subscribe( artista => {
                    this.artista = artista;
                    console.log(artista, "artista");
                  });
           this._spoty.getTop(id_artist)
                 .map( (lista:any) => lista.tracks)
                 .subscribe( tracks => {
                   console.log(tracks, "tracks");
                   this.tracks = tracks;
                   //this.artista = tracks;
                 });
          });
  }

}
