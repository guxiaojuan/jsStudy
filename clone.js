function clone(arr) {
	var type = typeJudge(arr);
	var copyObj;
	if (type !== 'Object' && type !== 'Array'){
		copyObj = arr;
	}else if(type === 'Array') {
		copyObj = [];
		for(var i=0,j=arr.length; i<j; i++) {
			copyObj[i] = clone(arr[i]);
		}
	}else if(type === 'Object') {
		copyObj = {};
		for(var it in arr) {
			copyObj[it] = clone(arr[it])
		}
	}

	return copyObj

}


function typeJudge(type) {
	var tmp = Object.prototype.toString.call(type);
	var reg = /^\[object\s(\w+)\]$/;
	return reg.exec(tmp)[1];
}

var tmp = [1,2,4,6,[3,54,[34,5,56]]]
var t = clone(tmp)
