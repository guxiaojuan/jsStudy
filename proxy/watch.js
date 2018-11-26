let onWatch = (obj, setBind, getLogger) => {
	let handler = {
		get(target, property, receiver) {
			console.log(receiver)
			getLogger(target, property);
			return Reflect.get(target, property, reveiver);
		},

		set(target, property, value) {
			console.log("==========receiver======")
			console.log(target);
			console.log(property);
			console.log(value);
			setBind(value);
			return Reflect.set(target, property, value);
		}
	}
	return new Proxy(obj, handler);
}

let obj = { a: 1 }
let value
let p = onWatch(obj, (v) => {
	value = v
}, (target, property) => {
	console.log(`Get '${property}' = ${target[property]}`);
})

p.a = 2;
// console.log(p.a);
console.log("========================================");


function createArray(...element){
	let handler = {
		get(target, propKey, receiver) {
			let index = Number(propKey);
			console.log(index);
			if(index<0) {
				propKey = String(target.length + index);
			}
			return Reflect.get(target, propKey, receiver);
		}

	};

	let target = [];
	target.push(...element);
	return new Proxy(target, handler);
}

let arr = createArray('a','b','c');
console.log(arr[-1]);
console.log("+++++++++++++++++++++++++++")

var target = function () { return 'I am the target'; };
var handler = {
	apply: function () {
		return 'I am the proxy';
	}
};

var p1 = new Proxy(target, handler);

console.log(p1())
























