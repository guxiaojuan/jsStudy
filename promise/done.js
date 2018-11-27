/*
*  ES6中没有封装Promise.done,ES8提案中
*  Promise.done没有返回Promise，他一般放在链式调用的最后，用来捕捉catch中未捕获到的异常，并且抛出到外边
*/


if (typeof Promise.prototype.done === 'undefined') {
	Promise.prototype.done = function (onFulfilled, onRejected) {
		this.then(onFulfilled, onRejected).catch(function(error) {
			setTimeout(() => {
				throw  error
			}, 0)
		})
	}
}