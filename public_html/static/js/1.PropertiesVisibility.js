/*Writted by Necseron*/

/*
 * Se desarrollará una estructura de clases con propiedades y métodos
 * con visibilidad pública y privada REAL, a continuación detallo el proceso
 */

//Ayuda inicial
//Declararemos las propiedas o métodos de la siguiente manera
//Públicos con this.nombre
//Privados con var _nombre (la barra baja es convención)

//Declarar el nombre de la clase
MiClase = function () {

    //Propiedad PRIVADA, no accesible desde el exterior
    var _contador = 0;
    //Propiedad booleana PÚBLICA
    this.argumentosRecibidos = arguments.length > 0;

    /*Método PÚBLICO, permite aumentar el contador desde fuera 
     llamando a _aumentaContador, que es privado*/
    this.aumentaContador = function () {
        _aumentaContador();
    };

    //Método PRIVADO, aumenta el contador en 1        
    var _aumentaContador = function () {
        _contador++;
    };

    //Método accesor PÚBLICO de contador 
    this.getContador = function () {
        return _contador;
    };
};

//Con esta estructura nos aseguramos que nuestro contador sólo será modificado con el método especificado

//Pruebas de funcionamiento

//Declaramos una variable del tipo MiClase

//El operador new llamará al constructor de la clase, que en este caso, no recibe parámetro alguno
var tester = new MiClase();

//Ahora ya tenemos acceso a los métodos públicos
tester.aumentaContador();
tester.aumentaContador();

var valorContador = tester.getContador(); //Devolverá 2
console.log(valorContador);

//Hemos visto propiedades y métodos públicos, por último veremos como declarar un método o propiedad estática

MiClase.soyEstatico = function () {

    var _privadoEstatico = 'soy estático';

    return _privadoEstatico;
};

//Lo llamaremos con

var valorEstatico = MiClase.soyEstatico();
console.log(valorEstatico);

//Hasta aquí esta explicación/recordatorio





