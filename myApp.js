document.addEventListener("DOMContentLoaded", function() {
	let inputElStart = document.querySelector('#start-date')
	let inputElStartError = document.querySelector('#startDateError')
	let inputElEnd = document.querySelector('#end-date')
	let inputElEndError = document.querySelector('#endDateError')
	let queryEl = document.querySelector('#query')
	let queryElError = document.querySelector('#queryError')
	let formEl = document.querySelector('.movie-reviews-form')
	let divElReviews = document.querySelector('.reviews-container')
	let clearBtn = document.querySelector('#clear')
	let messageContainerEl = document.querySelector('.message-container')
	let messageEl = document.querySelector('#message')
	let summaryBtn
	const BASE_URL = `https://api.nytimes.com/svc/movies/v2/reviews/search.json`
    const API_KEY = 'iUk6gAe1K9oarQC0qJ3bXn2tX1i5UFym'
    let URL
	let count = 5
	let messageTimeout = setInterval(() => {
		if(count > -1) {
			messageEl.textContent = `${count} seconds.`
			count--
		} else {
			messageContainerEl.style.display = 'none'
			clearInterval(messageTimeout)
		}
		
	}, 1000)
	function displayFromLocalStorage() {
		divElReviews.innerHTML = ''
		Object.keys(localStorage).map(key => {
			let reviews = JSON.parse(localStorage.getItem(key))
			if(reviews) {
				for(let i = 0; i < reviews.length; i++) {
					let singleReviewContainer = document.createElement('div')
					singleReviewContainer.classList.add('single-review-container')
					let titleEl = document.createElement('h1')
					titleEl.textContent = reviews[i].display_title
					let authorEl = document.createElement('h3')
					authorEl.textContent = `${reviews[i].byline} (publication date: ${reviews[i].publication_date})`
					let headLineEl = document.createElement('p')
					headLineEl.textContent = reviews[i].headline
					let imageEl
					if(reviews[i].multimedia) {
						imageEl = document.createElement('img')
						imageEl.src = reviews[i].multimedia.src
					}
					summaryBtn = document.createElement('button')
					summaryBtn.textContent = 'Show summary'
					summaryBtn.classList.add('show-summary')
					let summaryEl = document.createElement('p')
					summaryEl.textContent = reviews[i].summary_short
					summaryEl.classList.add('hide')
					let readReviewEl = document.createElement('a')
					readReviewEl.textContent = reviews[i].link.suggested_link_text
					readReviewEl.href = reviews[i].link.url
					readReviewEl.target = '_blank'
					let readReviewParagraphEl = document.createElement('h4')
					readReviewParagraphEl.append(readReviewEl)
					singleReviewContainer.append(
						titleEl, 
						authorEl, 
						headLineEl, 
						imageEl ? imageEl : '', 
						reviews[i].summary_short !== '' ? summaryBtn : '',
						reviews[i].summary_short !== '' ? summaryEl : '' , 
						readReviewParagraphEl
					)
					divElReviews.append(singleReviewContainer)
				}
			}
		})
	}
	displayFromLocalStorage()
	async function getReviews(queryInfo) {
		let response = await fetch(URL)
		let responseData = await response.json()
		localStorage.setItem(queryInfo, JSON.stringify(responseData.results))
		displayFromLocalStorage()
	}
	formEl.addEventListener('submit', e => {
		e.preventDefault()
		if(queryEl.validity.valueMissing) {
			queryElError.textContent = 'Please enter a movie query.'
		} else {
			queryElError.textContent = ''
		}
		if(inputElStart.validity.valueMissing && !inputElStart.validity.badInput) {
			inputElStartError.textContent = 'Please enter a start date.'
		} else if(inputElStart.validity.valueMissing && inputElStart.validity.badInput) {
			inputElStartError.textContent = 'Please enter a valid date.'
		} else {
			inputElStartError.textContent = ''
		}
		if(inputElEnd.validity.valueMissing && !inputElEnd.validity.badInput) {
			inputElEndError.textContent = 'Please enter an end date.'
		} else if(inputElEnd.validity.valueMissing && inputElEnd.validity.badInput) {
			inputElEndError.textContent = 'Please enter a valid date.'
		} else {
			inputElEndError.textContent = ''
		}
		let query = queryEl.value
		let startDate = inputElStart.value
		let endDate = inputElEnd.value
		if(!queryEl.validity.valueMissing && startDate && endDate && inputElStart.validity.valid && inputElEnd.validity.valid) {
			URL = `${BASE_URL}?query=${query}&publication-date=${startDate}:${endDate}&api-key=${API_KEY}`
			getReviews(query)
		}
	})
	divElReviews.addEventListener('click', e => {
		if(e.target.tagName === 'BUTTON' && e.target.nextElementSibling.tagName === 'P') {
			e.target.nextElementSibling.classList.toggle('hide')
			summaryBtn.textContent = e.target.nextElementSibling.classList.contains('hide') ? 'Show summary' : 'Hide summary'
		}
	})
	clearBtn.addEventListener('click', () => {
		localStorage.clear()
		divElReviews.innerHTML = ''
	})
})