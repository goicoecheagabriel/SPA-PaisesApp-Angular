import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [".mr-1{margin-left:5px}"
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _paisService: PaisService
  ) { }

  ngOnInit(): void {

    // nos suscribimos a los cambios de la ruta utilizando rxjs
    this._activateRoute.params
      .pipe(
        switchMap( ({ codigoPais:id }) => this._paisService.getPaisPorAlpha(id) ),
        tap(console.log)
      )
      .subscribe( pais => this.pais = pais,
         ( err:HttpErrorResponse )=> {
        console.log(err.message,'Personalizado');
      }, ()=>{
        console.log('La solicitud se ha completado')
      });

      // A PESAR DE AGREGAR EL BLOQUE DE COMPLETE ANTERIOR, CON RXJS NO FUNCIONA.
      // PARA EL CASO A CONTINIUACION USANDO DOS SUSCRIPCIONES SI FUNCIONA.

    // nos suscribimos a los cambios de la ruta
    /* this._activateRoute.params
      .subscribe( ({codigoPais:id}) => {
        console.log(id)

        this._paisService.getPaisPorAlpha( id ).subscribe( alpha =>{
          console.log(alpha)
        },(err:HttpErrorResponse)=> {
          console.log(err.message);
        }, ()=> {
          console.log('La peticion ha sido completada')
        } );

      } ) */
  }

}
