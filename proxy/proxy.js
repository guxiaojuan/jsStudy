var proxy = new Proxy({},{
	get:function () {
		return 34
	}
})

console.log(proxy.name);
proxy.test = 1;
console.log(proxy.test);

var obj = {};
Object.defineProperty(obj, 'name', {
	get:function () {
		return 42;
	}
})

console.log(obj.name);

console.log("============================")

var handler = {
	get: function(target, name) {
		if (name === 'prototype') {
			return Object.prototype;
		}
		return 'Hello, ' + name;
	},

	apply: function(target, thisBinding, args) {
		return args[0];
	},

	construct: function(target, args) {
		return {value: args[1]};
	}
};

var fproxy = new Proxy(function(x, y) {
	return x + y;
}, handler);

var test = fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
console.log(test);
console.log(new fproxy(1,2));

