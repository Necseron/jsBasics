var foo2 = function(){

};

foo2.prototype.bar = function(){

};

var bar = new foo2();

console.log(bar);


var foo = {
	bar : function(){

	}
};

var baz = Object.create(foo);
console.log(baz);


var ext = function(){

};

ext.prototype.dosomething = function(){

};

class s extends ext{}

ss = new s();

console.log(ss);
