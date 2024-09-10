
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("submitSearch")
const searchResultWrapper = document.getElementsByClassName("search-result__wrapper")[0]
const clearButton = document.getElementById("deleteBttn")

searchButton.addEventListener("click", async () => {
	
	const inputValue = searchInput.value.toLowerCase()
	// Always clear value
	searchResultWrapper.innerHTML = ""

	try {
		const response = await fetch("./travel_recommendation_api.json")

		if(!response.ok){
			throw new Error(`An error occur: ${response.status}`)
		}

		const beachKey = ["beaches", "beach"]
		const templesKey = ["temples", "temple"]
		const countryKey = ["countries", "country"]
		
		let keyword;
		
		if(beachKey.includes(inputValue)){
			keyword = "beaches"
		} else if (templesKey.includes(inputValue)){
			keyword = "temples"
		} else if (countryKey.includes(inputValue)){
			keyword = "countries"
		}

		const data = await response.json()
		const searchResult = data[keyword]
		
		if(searchResult){
			searchResultWrapper.classList.remove("no-display")

			if(countryKey.includes(inputValue)){
				searchResult.map(item => {
					
					item.cities.map(city => {
						const { name, imageUrl, description } = city

						searchResultWrapper.innerHTML += `<div class="search-result__container">
						<div class="img-container">
							<img src="./assets/places/${imageUrl}" alt="" srcset="">
						</div>
						<div class="place-description">
							<p class="place-name">${name}</p>
							<p>${description}</p>
							<button type="button">Visit</button>
						</div>
					</div>`
					})
					
				})
			} else {
				searchResult.map(item => {
					const { name, imageUrl, description } = item
	
					searchResultWrapper.innerHTML += `<div class="search-result__container">
						<div class="img-container">
							<img src="./assets/places/${imageUrl}" alt="" srcset="">
						</div>
						<div class="place-description">
							<p class="place-name">${name}</p>
							<p>${description}</p>
							<button type="button">Visit</button>
						</div>
					</div>`
				})
			}

		} else {
			throw new Error("No result found.")
		}


	} catch (error) {
		console.error(error)
		alert(error.message)
	}
})

clearButton.addEventListener("click", () => {
	searchResultWrapper.classList.add("no-display")
	searchResultWrapper.innerHTML = ""
})


