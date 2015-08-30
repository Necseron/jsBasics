/* Reglas para la asignación del `this`
 * Escrito por Víctor Collado v.1
 * fuente : You Don't Know JS: this & Object Prototypes, by Kyle Simpson
 *
 * Para entender el funcionamiento del `this` se debe tener en cuenta que este tomará el valor dependiendo del call-site,
 * es decir, el punto desde el que se realiza la llamada a la función.
 * El call-site se encontrará analizando el call-stack (herramientas de depuración) en el origen de la llamada ( top )
 * 
 * Índice:
 * 1. Default Binding
 * 2. Implicit Binding
 * 3. Implicitly Lost I
 * 4. Implicitly Lost II
 * 5. Explicit Binding
 * 6. Hard Binding
 * 7. Pass-through Pattern 
 * 8. `new` Binding
 */

function foo()
{
    console.log(this.a);
}

// =================================================================================================================
// 1. Default Binding
// =================================================================================================================

var a = 3;
//_ foo(); // 3

// ejemplo de `context-object`
var obj1 = {
    a: 1,
    foo: foo
};

var obj2 = {
    a: 2,
    foo: foo,
    obj1: obj1
};

// =================================================================================================================
// 2. Implicit Binding, con un `context-object` (`obj1`), donde este será usado para la unión del `this`
// =================================================================================================================

//_ obj2.obj1.foo(); // 1

var obj3 = {
    a: 2,
    foo: foo
};

var bar = obj3.foo; // referencia a la función
var a = "oops, global!";

// =================================================================================================================
// 3. Implicitly Lost I ( perdiendo las uniones en los objetos )
// =================================================================================================================

//_ bar(); // oops, global! -> solucionado en "Explicit Binding"
/* esto sucede porque el call-site está fuera del `context-object` obj3, 
 * y en el momento de llamar a la función `a` tiene el valor `oops, global!`  
 */
//_ obj3.foo(); // 2 -> se mantiene el valor ya que el call-site está dentro del `context-object` `obj3`

// =================================================================================================================
// 4. Implicitly Lost II ( perdiendo las uniones en las funciones )
// =================================================================================================================

obj4 = {
    a: 3,
    foo: foo
};

function doFoo(fn)
{
    // `fn` es una referencia a `foo`

    // console.log(a);
    fn(); // call-site
}

/* vuelve a suceder lo mismo, ya que cuando pasamos la función por referencia lo único que estamos haciendo 
 * es una asignación implicita, tal que, fn = obj4.foo, donde `a` mantiene su scope con el valor... `oops, global!`
 */

//_ doFoo(obj4.foo); // oops, global!
//_ doFoo.call(obj4,obj4.foo); // oops, global! -> solucionado en "Hard Binding"

// =================================================================================================================
// 5. Explicit Binding ( `call` and `apply` ) -> solucionando el caso de Implicitly Lost I ( objetos )
// =================================================================================================================

var obj5 = {
    a: 4
};

//_ foo(); // oops, global!
//_ foo.call(obj5); // 4 -> Solucionado

/* con el método `call` podremos especificar que objeto usaremos por `this`
 * nota: si pasamos un valor primitivo string, boolean o number, este será envuelto en un tipo Object ( proceso conocido como Boxing )
 * del tipo new String(), new Boolean(), new Number(), ... respectivamente
 */

// =================================================================================================================
// 6. Hard Binding ( `call` and `apply` ) -> solucionando el caso de Implicitly Lost II ( funciones )
// =================================================================================================================

var obj5 = {
    a: 5,
    foo: foo
};

// ejemplo 1 ( sin función por referencia )

var bar2 = function ()
{
    foo.call(obj5);
};

//_ bar2(); // 5 -> Solucionado

// ejemplo 2 ( con función por referencia )

var bar3 = function (fn)
{
    // `obj5` será el context-object y fn el argumento
    fn.call(obj5, fn);
};

//_ bar3(obj5.foo); // 5 -> Solucionado

// =================================================================================================================
// 7. Pass-through Pattern 
// =================================================================================================================

// redeclarar la función base
function foo2(something)
{
    //_ console.log(this.a, something);
    return this.a + something;
}

var obj6 = {
    a: 6
};

var bar3 = function ()
{
    // ya que apply acepta un array como argumento se traspasará el array predefinido `arguments`a la función base( de ahí su nombre ) 
    // es decir, bar3 actuará como un "envoltorio conservador de contexto", (en este caso obj6)
    return foo2.apply(obj6, arguments);
};

var b3 = bar3(2); // 6 2
//_ console.log(b3); // 8 -> Perfecto!

// =================================================================================================================
// 8. Reusable Helper Pass-through Pattern ( modelo reutilizable para cualquier objecto )
// =================================================================================================================

var obj7 = {
    a: 7
};

function bind(fn, obj)
{
    // de esta manera se configuraría el `this` de nuestro objeto 
    // al que fuera determinado por parametro y devolviendo una función anónima
    // semejante a la del apartado anterior `bar3`    
    return function () {
        return fn.apply(obj, arguments);
    };
}

var bar4 = bind(foo2, obj7);
var b4 = bar4(3);
console.log(b4); //10

// =================================================================================================================
// `new` Binding
// =================================================================================================================

// todo ...
