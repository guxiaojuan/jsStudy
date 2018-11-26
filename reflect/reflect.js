var my = {
	foo: 1,
	set bar(value) {
		return this.foo = value;
	},
}

console.log(my.foo) // 1

Reflect.set(my, 'foo', 2);



var myObject = {
	foo: 4,
	set bar(value) {
		return this.foo = value;
	},
};

var myReceiverObject = {
	foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
console.log(myObject.foo);
console.log(myReceiverObject.foo);
