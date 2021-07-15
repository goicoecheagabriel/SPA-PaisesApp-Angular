### INSTALAR ANGULAR EN NUESTRO SISTEMA
#### WINDOWS
+ Verificar que tenemos instalado nodejs
+ Verificar que tenemos instalado npm
+ Luego correr en una consola el siguiente comando con npm
```
npm install -g @angular/cli
```

### MANEJO DE DATOS ENTRE DISTINAS JERARQUIAS POSICIONALES, ABUELOS, HIJOS, NIETOS
+ INPUT  
Imaginemos que  tenemos un componente padre llamado main-page.component.ts con un arreglo de personajes como vemos en el siguiente ejemplo:
```
export class MainPageComponent {

  personajes: Personaje [] = [
    {
      nombre: 'Goku',
      poder: 15000
    },
    {
      nombre: 'Vegeta',
      poder: 7500
    }
  ];
  ...
```
Luego utilizamos este arreglo `personajes` en un componente hijo. Entonces en el main-page-component.html enviamos el arreglo dentro de la etiqueta del componente hijo. En este caso la etiqueta de este componente se llama `app-personoajes`.
```
<div class="row">
    <div class="col">
        <app-personajes [personajes]="personajes">
        </app-personajes>
    
    </div>
...
```
Para poder utilizar este arreglo en el componente hijo. Debemos utilizar el decorador `@nput()` que se importa de `import { Component, Input } from '@angular/core';`. Ver ejemplo compeleto del componente hijo en personajes.component.ts
```
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html'
})
export class PersonajesComponent {

  @Input() personajes: any[] =[];

  }
```
De esta manera dentro del archivo `personajes.component.html` podemos utilizar el arreglo con los valores originarios del componente padre como se ve en el siguiente ejemplo.
```
<h3>Personajes</h3>
<hr>
<ul>
    <li *ngFor="let personaje of personajes;">
        {{personaje.nombre}} - {{personaje.poder}}
    </li>
</ul>
```
Entonces, en resumen, podemos enviar un atributo de un padre a un hijo en la declaracion html del componente y luego recibirlo en el hijo utilizando el decorador `@input` importado de `import { Component, Input } from '@angular/core';`
+ OUTPUT  
Un componente hijo puede utilizar la anotación `@Output()` para emitir un evento personalizado desde dicho componente.
Realizaremos un ejemplo que trata de lo siguiente: Tenemos un componente llamado `agregar.component.ts` el cual disparará un evento que enviará un nuevo personaje. Ese evento será recibido por su componente padre `main-page.component.ts` el cual al momento de que se emita el evento, el mismo enviará el objeto `Personaje` y podrá ser recibido por el componente padre.
De esta manera, cuando el evento sea disparado, tendremos un método que estará escuchando el evento y recibirá como argumento este `Personaje`, con el que podrá realizar en este método el agregado al arreglo de personajes, que no es ni más ni menos que una propiedad del componente padre.
#### Estructura del objeto personaje
```
nuevo:Personaje = {
    nombre: '',
    poder: 0
  }
```
#### Registro y salida del evento `onNuevoPersonaje`
```
@Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();
```
#### Línea utilizada para emitir el evento y enviar un personaje como argumento
```
this.onNuevoPersonaje.emit( this.nuevo );
```
#### En el siguiente código se muestra como el componente padre se pone a escuchar el evento
El que también se encarga de conectarlo al método que se disparará cuando el evento sea lanzado.
En el mismo método enviamos como argumento el `$event` que contendrá el objeto `Personaje`.  
Este código se pone en el selector del componente hijo `<app-agregar>` ubicado en el componente padre `main-page.compoonent.html`
```
<app-agregar 
    [nuevo]="nuevo"
    (onNuevoPersonaje)="agregarNuevoPersonaje($event)"
>
</app-agregar>
```
#### Luego creamos el método en el ts del componente padre `main-page.compoonent.ts`
```
agregarNuevoPersonaje(personaje:Personaje){
   this.personajes.push(personaje);
 }
```
De esta manera queda funcional.  
En resumen, el componente agregar.component al darle click en el boton de agregar arma un objeto con los campos del formulario y dispara un evento que envia el objeto creado. El componente padre se encuentra escuchando este evento y cuando lo escucha dispara el método que agrega al arreglo personajes el objeto recibido con el evento.  
A continuación mostramos los fragmentos de codigo mas relevantes.

#### Clase del componente hijo (agregar.component.ts)
```
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent{

  @Input() nuevo:Personaje = {
    nombre: '',
    poder: 0
  }
  @Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();

  agregar(){
    if ( this.nuevo.nombre.trim().length === 0 ) {return;}

    console.log(this.nuevo);
    this.onNuevoPersonaje.emit( this.nuevo );

    this.nuevo = {
      nombre: '',
      poder: 0
    }

  }

}
```
#### HTML del componente padre (main-page.component.html)
```
<h1>Dragon Ball Z</h1>
<hr>

<div class="row">
    <div class="col">
        <app-personajes [personajes]="personajes"></app-personajes>
    
    </div>

    <div class="col">
        <app-agregar 
            [nuevo]="nuevo"
            (onNuevoPersonaje)="agregarNuevoPersonaje($event)"
        >
        </app-agregar>
    </div>
</div>
```
#### Clase del componente padre (main-page.component.ts)
```
import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  personajes: Personaje [] = [
    {
      nombre: 'Goku',
      poder: 15000
    },
    {
      nombre: 'Vegeta',
      poder: 7500
    }
  ];

  nuevo:Personaje = {
    nombre: 'Maestro Roshi',
    poder: 1000
  }
  
 agregarNuevoPersonaje(personaje:Personaje){
   this.personajes.push(personaje);
 }

}
```
+ SERVICIOS  

Creamos una carpeta dentro de la zona de dbz (dragon ball Z)
```
// La carpeta se llamará
services
```
Dentro de esta carpeta agregaremos un archivo ts denominado `dbz.services.ts`. Este contendrá una clase exportable igual que las clases de los componentes, con la diferencia de que utilizaremos una notacion distinta a la utilizada en un componente. En este caso la notación será `@Injectable()` que será importada desde `import { Injectable } from "@angular/core";`.
Esto lo que hará esencialmente es crear una clase con el patrón ***singleton*** que garantiza que no importa quien instancie esta clase. Solo se creará una referencia en toda la aplicación, y todos los cambios que se generen en sus métodos y propiedades serán actualizados en todos los componentes que la referencien, sin importar quién genere este cambio.
### Código de una clase servicio con notacion `@Injectable()`
```
import { Injectable } from "@angular/core";

@Injectable()
export class DbzService {

    constructor(

    ){
        console.log('Servicio inicializado.');
    }

    imprimirNombre(nombre:string){
        console.log('Mi nombre es:', nombre);
    }

}
```
### Código de un componente que consume esta clase
```
import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

//Aquí importamos el servicio @Injectable();
import { DbzService } from '../services/dbz.services';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  personajes: Personaje [] = [
    {
      nombre: 'Goku',
      poder: 15000
    },
    {
      nombre: 'Vegeta',
      poder: 7500
    }
  ];

  nuevo:Personaje = {
    nombre: 'Maestro Roshi',
    poder: 1000
  }
  
 agregarNuevoPersonaje(personaje:Personaje){
   /* debugger; */
   this.personajes.push(personaje);
 }

 //Aquí consumimos el servicio @Injectable()
 constructor( private dbzService: DbzService ) {};

}

```

### Código de otro componente que consume el mismo servicio
```
import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

//Aquí importamos el servicio @Injectable();
import { DbzService } from '../services/dbz.services';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html'
})
export class PersonajesComponent {

  @Input() personajes: Personaje[] =[];

  //Aquí consumimos el servicio @Injectable();
  constructor( private dbzService: DbzService ) {
    dbzService.imprimirNombre('Iñaki Goicoechea')
  };
  }
```

1. PROFUNDIZAR UN POCO MAS EN MODULOS
2. FORMSMODULE
3. NGMODEL
4. @INPUT
5. @OUTPUT
6. SERVICIOS
7. METODOS DE SERVICIOS
8. DEPURACIONES

#### GENERAR UN NUEVO MODULO CON NG CLI
+ desde la terminal debermos poner el siguiente comando.
```
ng generate module dbz
```
o
```
ng g m dbz
```

#### GENERAR UN COMPONENTE DENTRO DEL MODULO ANTERIOR
+ desde la terminal deberemos poner el siguiente comando.

```
ng generate component dbz/mainPage
```
o
```
ng g c dbz/mainPage
```

+ por otro lado si quisieramos evitar que nos genere el archivo de test (pruebas), podemos utilizar la siguiente bandera.
```
ng g c dbz/mainPage --skipTests
```

Si creamos el componente luego de crear el module, se actualizará el modulo de la carpeta antes que el de la app.
Angular es lo sufisientemente inteligente para detectar que ese componente corresponde a ese modulo y no al de la app.  
Lo que queda pendiente para que el componente pueda funcionar, es exportar el componente para que esté disponble para su uso fuera de este modulo.  
Por otro lado, debemos importar en el app.module el module DbzModule en la zona de imports. De esta manera ya estaria todo preparado para utilizar el componente en app.component.html con su nombre <app-main-page>.

#### FORMMODULE
Para evitar que se hagan recargas de la pagina cuando hacemos un submit del formulario. Podriamos utilizar el envio del evento con $event en la llamada de la funcion y recibirlo con event:any || event:Event.  
Pero para esta situacion, podemos importar el FormsModule en nuestro dbz.module.ts desde `import { FormsModule } from '@angular/forms';` y utilizar el `ngSubmit` de la siguiente manera.
```
<form (ngSubmit)="agregar()">
    <input placeholder="Nombre" type="text">
    <input placeholder="Poder" type="number">
    <button type="submit">
        Agregar
    </button>
</form>
```
Realizando esa llamada al evento `ngSubmit`, solo se encarga de prevenir el evento como lo haría `preventDefault()`.

### ngModel
El ngModel, lo utilizamos para conectar un input con una propiedad especifica de datos definida en nuestra clase.   Ejemplo de objeto Personaje:
```
public nuevo:Personaje = {
    nombre: 'Trucks',
    poder: 14000
  }
```
Para conectar la propiedad `nombre` con el input nombre del formulario. Primero asegurarse que el input tenga definida la propiedad nombre y luego agregar como otra propiedad del input el `ngModel`, como puede verse en el siguiente ejemplo.
```
<input
    placeholder="Poder"
    type="number"
    name="poder"
    [(ngModel)]="nuevo.poder"
/>
```
Esto dejará binding el input con la propiedad. Quiere decir que cualquier cambio que haya en el input se verá reflejado en la propiedad de la clase,  y cualquier cambio que haya en la propiedad se verá reflejado en el input.

### Como utilizar `@ViewChild()`
`@ViewChild` nos permite vincularnos a una referencia de html donode utilizariamos `#nombreReferencia` como un atributo de `HTML`. En el ejemplo siguiente realizamos una vinculacion entre un metodo de clase llamado `buscar()` y un elemento `Input` de `HTML`. La idea fundamental es poder recoger el value del input y agregarlo a una propiedad de Array cuando presionamos la tecla enter. También podemos observar el uso del evento `keyup.enter`. A continuacion se puede ver el código HTML y luego el ts del componente.
```
<h5>Buscar:</h5>
<input
    type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="buscar()"
    #txtBuscar  
>
```
```
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  historial: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar() {
      this.historial.push(this.txtBuscar.nativeElement.value)
      this.txtBuscar.nativeElement.value = '';

      console.log('Has apretado enter', this.historial);
    
  }

}
```

### Ejemplo uso de `HttpClient`
Angular pone a disposición una librería llamada HttpClient, la cual permite realizar peticiones http utilizando distintos verbos `get, post, delete, put, etc` y permitiendo personalizar y gestionar opciones de nuestras peticiones. A la vez permite utilizar observables, que son propios de la tecnologia RXjs y suscribirse a esos observables. La librería es muy amplia pero a rasgos generales permite reemplazar el uso de `Fetch` con una libreria más personalizada y orientada al consumo y gestión de una API.  
Lo minimo para implementar un servicio que utilice HttpClient es lo siguiente.  
+ Crear un servicio
+ Importar el modulo HttpClient
  + `import { HttpClientModule } from '@angular/common/http'`
  + Esta importación se realiza en el `import` del módulo de ámbito del servicio
+ Importar la libreria en el servicio creado, donde lo vamos a utilizar.
+ Inyectar el HttpClient en nuestra clase en una propiedad privada
+ Utilizar la propiedad para disparar peticiones.
+ Cosumir las devoluciones de las peticiones realizadas  

Ejemplos de uso. El siguiente codigo se utiliza en el modulo app.module.js
```
...
import { HttpClientModule } from '@angular/common/http'
...
```
```
...
imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    GifsModule,
  ],
...
```
Luego podemos inyectarlo en nuestro servicio donde consumiremos el `HttpClient`
```
...
import { HttpClient } from '@angular/common/http';
...
```
```
...
constructor(private http: HttpClient){ }
...
```
Utilizamos la propiedad creada, en este caso `http`
```
...
this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=QrSdM69MEDHnauk5os2EpW0lHA9zPcDu&q=${query}&limit=10`)
      .subscribe( (resp:any) => {
        this.resultados = resp.data;
      } )
...
```
Esto realizaria una carga de datos con la respuesta en la propiedad resultados de este servicio. Esta propiedad luego puede ser utilizada desde el componente que consuma este servicio de la siguiente manera.
```
import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent{


  get resultados(){
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService ) { 
    
  }
}
```
`html` del componente
```
<div class="row">
    <div
        *ngFor="let gif of resultados"
        class="col-md-4 col-sm-6"
    >
        <div class="card">
            <img 
                [src]="gif.images.downsized_medium.url" 
                [alt]="gif.title"
                class="card-img-top">
            <div class="card-body">
                <p class="card-text">
                    {{ gif.title }}
                </p>
            </div>
        </div>
    </div>
</div>
```

### ngClass, class, [class]  
Las anteriores son distintas formas que tenemos de gestionar nuestras clases de css en los elementos de html.  
Vamos a plantear un problema típico a resolver. Imaginemos que tenemos y elementos, en este caso son botones en los cuales tenemos aplicado en casa boton las siguientes clases de boostrapp `btn btn-outline-primary` y cada vez que el usuario hace click queremos que se cambie la clase `btn-outline-primary` por la clase `btn-primary`, esta es una situación bastante común que podría darse cuando queremos indicar que un elemento de un conjunto se encuentra seleccionado. A continuación nuestro código base.
```
...
<div class="row">
    <div class="col">
        <button
            *ngFor="let region of regiones"
            class="btn btn-outline-primary"
            (click)="activarRegion(region)"
            >
            {{ region }}
        </button>
    </div>
</div>
...
```
Para hacer este trabajo tenemos varias alternativas, las cuales identificaremos con un ejemplo para poder graficar.  
## Ejemplo 1 - `class`.
En el atributo de los botones agregaremos el atributo class de la siguiente manera.
```
...
<button
    *ngFor="let region of regiones"
    class="btn btn-outline-primary"
    [class.btn-primary]="region === regionActiva"
    (click)="activarRegion(region)"
    >
    {{ region }}
</button>
...
```

## Ejemplo 2 - `ngClass`.
En el atributo de los botones agregarremos el atributo `ngClass` de la siguiente manera. En este caso le pasaremos al atributo `ngClass` un objeto con propiedades que representan los nombres de las clases que se quieren agregar o quitar. Y el valor de la propiedad es una expresion de javascript que debe devolver un `true` o `false`, dependiendo de si debe mosotrar o no esa clase
```
...
<button
    *ngFor="let region of regiones"
    class="btn btn-outline-primary"
    [ngClass]="{
        'btn-primary': regionActiva === region,
        'btn-outline-primary': regionActiva !== region
    }"
    (click)="activarRegion(region)"
    >
    {{ region }}
</button>
...
```

## Ejemplo 3 - `[class]="activarRegion( region )"`.
En el atributo de los botones agregaremos el atributo class de la siguiente manera. En este caso utilizaremos un `return` de una funcion declarada en el `.ts` del componente. Por lo que este ejemplo mostrará dos fracciones de código del archivo `.ts` y `.html`.  
Archivo `.html`
```
...
<button
    *ngFor="let region of regiones"
    class="btn btn-outline-primary"
    [class.btn-primary]="region === regionActiva"
    (click)="activarRegion(region)"
    >
    {{ region }}
</button>
...
```
Archivo `.ts`
```
...
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';

  constructor() { }

  getClaseCSS( region: string ) {
    return ( this.regionActiva == region ) 
      ? 'btn-primary' 
      : 'btn-outline-primary'
  }
...
```
Lo importante para destacar es que esta funcion devuelve o un string con `btn-primary` o una cadena con `btn-outline-primary`

# Como crear un tag en Github
En principio una vez que queremos respaldar los cambios debemos hacer lo siguiente.

```
git add .
```
Esto nos agregará todos los cambios al `stage`  
Luego debemos hacer un commit
```
git commit -m "Nota del commit"
```
Luego debemos hacer un push a nuestro remoto.
```
git push -u prigin main
```
Luego ya podemos hacer un tag hasta este punto.
```
git tag -a v0.1.0 -m "Comentarios para la version"
```
si queremos listar el tag creado haremos
```
git tag
```
y nos mostrará en pantalla el tag creado o los tags creados si habian de antes.  
Luego podemos subir el tag a remoto
```
git push --tags
```

Una vez hecho esto si queremos que git lo muestre como `release`. Deberemos ir a github, hacer click en release para que nos muestre los tags y editar el tag para que aparezca en la lista de release.  
Listo!

### Uso de rutas con `RouterModule`
Las rutas nos servirán para mostrar distintos componentes de la aplicacion dependiendo de la url en la que estemos.
+ Creamos un modulo llamado `app-routing-module.ts` en el src/app del proyecto.  

Lo configuramos de la siguiente manera
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

const routes: Routes = [
    { path:'', component: PorPaisComponent, pathMatch: 'full'},
    { path:'region', component: PorRegionComponent},
    { path:'capital', component: PorCapitalComponent},
    { path:'pais/:codigoPais', component: VerPaisComponent},
    { path:'**', redirectTo: ''},
];

@NgModule({
    imports:[
        RouterModule.forRoot( routes )
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{};
```
Asegurarse de que éste sea importado, ya que luego lo importaremos en el modulo principal de la aplicacion.
+ Ahora lo importaremos en el app.module.ts
```
...
import { AppRoutingModule } from './app-routing.module';
...
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaisModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
...
```
Esto nos dejará disponible un nuevo componente llamado `<router-outlet></router-outlet>` que lo utilizaremos en el lugar donde queremos mostrar el resultado de las rutas.
Es decir, si lo utilizamos dentro del app.component.html, éste mostrará el resultado del routing en ese componente.
+ Nosostros importaremos el routing en el app.component.html dentro de la segunda col definida en nuestro html.
```
<div class="row container mt-4">
    <div class="col-3">
        <h2>Busquedas</h2>
        <hr>
        <ul>
            <li class="list-group-item">Buscar país</li>
            <li class="list-group-item">Por región</li>
            <li class="list-group-item">Por capital</li>
        </ul>
    </div>
    <div class="col">
        <router-outlet></router-outlet>
    </div>
</div>
```
El próximo paso va a ser configurar con el atributo RouterLink los vínculos para poder navegar sobre el router.
+ Especificando el routerLink como atributo de los elementos que tienen el redireccionamiento.
+ En nuestro caso serian los elementos `<li></li>` del `html`
```
<ul>
            <li 
                routerLink=""
                routerLinkActive="active"
                [routerLinkActiveOptions]="{exact: true}"
                class="list-group-item"
                >
                Buscar país
            </li>
            <li 
                routerLink="region"
                routerLinkActive="active"
                class="list-group-item"
                >
                Por región
            </li>
            <li 
                routerLink="capital"
                routerLinkActive="active"
                class="list-group-item"
            >
                Por capital
            </li>
        </ul>
```
Como podemos observar también utilizamos el `routerLinkActive` que nos sirve para agregar una clase al elemento que contiene el routerLink cuando la ruta del navegador coincide con el valor de su propiedad.  
Por otra parte también podemos apreciar el uso de `[routerLinkActiveOptions]="{exact: true}"` que solo lo utilizamos en el primer `<li></li>`, esto es porque éste nos lleva a una ruta `""`(vacia), entonces de esta manera le indicamos que solo aplique la clase definida en `routerLinkActive` cuando sea exacta a vacia. De otra manera todas las rutas empiezan con vacia y siempre quedaria activo.  
> Tener en cuenta que si queremos utilizar los atributos mencionados antes en un componente independiente al componente raiz. Debemos realizar la importacion del `RouterModule` en el modulo del componente donde queremos utilizarlo.


# Como hacer un build de nuestra aplicacion
+ Asegurarnos de que nuestra aplicación está corriendo sin errores y que ésta esté en la versión esperada.
+ Luego abrir una terminal y ejecutar el siguiente comando
```
ng build --prod
```
Esto nos generará, si no estaba ya, una nueva carpeta con el nombre `dist` y dentro de ella una carpeta que contrendrá nuestra app.
Esos archivos son nuestra app ya compilada para ser servida por un `servidor http`.

