import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(
    private _paisService: PaisService
  ) { }

  buscar( termino: string ) {
    this.termino = termino;
    if( this.termino.trim().length === 0 ) {
      return;
    }

    this. hayError = false;

    this._paisService.buscarCapital( termino )
      .subscribe( (paises) => {
        console.log(paises);
        this.paises = paises;
      },
      ( err: HttpErrorResponse ) => {
        console.log(err.message);
        this.hayError = true;
        this.paises = [];
      })
  }

  sugerencias( termino: string ) {
    this.hayError = false;
    // TODO: Crear sugerencias;
  }

}
