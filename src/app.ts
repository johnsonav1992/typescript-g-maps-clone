const form = document.querySelector('form')!
const addressInput = document.querySelector('#address')! as HTMLInputElement

const searchAddressHandler = (event: Event) => {
	event.preventDefault()
  const enteredAddress = addressInput.value

  //send to Google's API
}

form.addEventListener('submit', searchAddressHandler)
