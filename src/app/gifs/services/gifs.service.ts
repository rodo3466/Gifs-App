import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apikey: string = 'unIfkgQy0JAYnYKrbOwxE5FUafNJ6clf';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/search';
  private cantidadGifs: number = 10;
  constructor(private http: HttpClient){
    this.ObtenerLocalStorage();
    this.cargarGifInicial();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }
  private ordenarHistory(tag: string){
    let tags=this._tagsHistory;
    tag = tag.toLowerCase();
    if(tags.find(e => e === tag)){ //existe en el histórico
      tags = tags.filter(e=> e!=tag);
    }
    tags.unshift(tag);
    tags = tags.splice(0, 10);
    this._tagsHistory=tags;
    //console.log(tags);
  }
  searchTag(tag: string): void{
    if(tag == '') return; //valor de búsqueda vacío
    this.ordenarHistory(tag);
    this.guardarLocalStorage();

    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('q', tag)
    .set('limit', this.cantidadGifs)

    this.http.get<SearchResponse>(this.serviceUrl, {params})
    .subscribe(resp => {
      this.gifList = resp.data;
      //console.log(this.gifList);
    });
  }

  private guardarLocalStorage(): void{
    localStorage.setItem('historial', JSON.stringify(this._tagsHistory));
  }

  private ObtenerLocalStorage(): void{
    if(!localStorage.getItem('historial')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('historial')!);

  }

  private cargarGifInicial(){
    this._tagsHistory.length>0 ? this.searchTag(this._tagsHistory[0]) : false; //cargar gifs de primer boton histórico
  }

}
