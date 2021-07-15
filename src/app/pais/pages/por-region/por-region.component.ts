import { Component, Output } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
  button {
    margin-right: 5px;
  }`
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];


  constructor(
    private _paisService: PaisService
  ) { }

  getClaseCSS( region: string ) {
    return ( this.regionActiva == region ) 
      ? 'btn-primary' 
      : 'btn-outline-primary'
  }

  activarRegion( region: string ){

    if ( region === this.regionActiva ) return;

    this.regionActiva = region;
    this.paises = [];

    //TODO: hacer el llamado al servicio
    this._paisService.buscarRegion( region )
      .subscribe( paises =>{
        this.paises = paises;
      },
      (err:HttpErrorResponse) => {
        console.log('Ha ocurrido un error: ', err.message)
      },
      () => {
        console.log('La peticion ha sido realizada.')
      })
  }


}
