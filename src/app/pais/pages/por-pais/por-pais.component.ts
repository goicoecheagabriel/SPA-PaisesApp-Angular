import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li {
    cursor:pointer;
  }
  `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias:boolean = false;


  constructor( private paisService: PaisService ) { }

  buscar(termino:string) {
    if( this.termino.trim().length === 0 ){
      return;
    }
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;
    this.paisService.buscarPais(termino)
      .subscribe( (paises) => {
        console.log(paises)
        this.paises = paises;
        
      },
      ( err ) => {
        this.hayError = true;
        this.paises = [];
      } );
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarPais( termino )
      .subscribe( paises => {
        this.paisesSugeridos = paises.splice(0,5);
      },
      (err:HttpErrorResponse) => {
        this.paisesSugeridos = [];
        console.log('Ha ocurrido un error con las sugerencias',err.message)
      },
      () => console.log('Las sugerencias han sido consultadas...') )
    
  }

  buscarSugerido(termino:string ){
    this.buscar(termino);
  }

}
