function getCookie(name) {
	var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	var arr = document.cookie.match(reg);
	if (arr) {
		return decodeURIComponent(arr[2]);
	}else {
		return null
	}
}

function setCookie(name, value) {
	var days = 365;
	var exp = new Date();
	exp.setTime(exp.getTime() + days*24*60*60*1000);
	document.cookie = name + "="+ encodeURIComponent (value) + ";expires=" + exp.toGMTString();
}

function delCookie (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval) {
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
}