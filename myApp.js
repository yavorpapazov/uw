document.addEventListener("DOMContentLoaded", function() {
	let para = document.querySelector('.h3')
	function addNum(n) {
		let local = n
		return local
	}
	console.log(addNum(5))
	para.textContent = `Hello, friends!`
})