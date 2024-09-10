
// Contact us page

const formSubmit = (e) => {
	e.preventDefault()
	alert("Your feedback is received. Thank you!")

	const messageForm = document.getElementById("messageForm")

	messageForm.reset()

}