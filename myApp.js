document.addEventListener("DOMContentLoaded", function() {
	let para = document.querySelector('.h3')
	let d = new Date(2022, 5, 15)
	console.log(d)
	para.textContent = 'Hello, friends! This is a complete change!'
})