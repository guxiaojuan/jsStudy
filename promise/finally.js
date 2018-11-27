/*
*  ES6中没有封装Promise.finally,ES8提案中
*  Promise.finally返回一个Promise，状态和前边和他连接的promise一致，无论前边的promise是fulfilled还是rejected，finally都会执行
*/


if (typeof Promise.prototype.finally === 'undefined') {
	Promise.prototype.finally = function (fun) {
		return this.then(function(res) {
			Promise.resolve(fun()).then( () => res)
		}, function(err) {
			Promise.reject(fun()).then( () => {throw err})
		})
	}
}