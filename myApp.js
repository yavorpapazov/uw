document.addEventListener("DOMContentLoaded", function() {
	let para = document.querySelector('.h3')
	let d = new Date(2022, 5, 15)
	console.log(d)
	let c = 4 + 5
	para.textContent = `Hello, friends! This is a complete change! The result is ${c}`
})