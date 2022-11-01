import axios from 'axios'

const form = document.querySelector('form')!
const addressInput = document.querySelector('#address')! as HTMLInputElement

const GOOGLE_API_KEY = 'AIzaSyAJH9BwhKTRkugTS2Fc3X24Mugo-SEAkEQ'

type GoogleGeocodingResponse = {
	results: { geometry: { location: { lat: number; lng: number } } }[]
	status: 'OK' | 'ZERO_RESULTS'
}

const searchAddressHandler = (event: Event) => {
	event.preventDefault()
	const enteredAddress = addressInput.value

	axios
		.get<GoogleGeocodingResponse>(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
				enteredAddress
			)}&key=${GOOGLE_API_KEY}
  `
		)
		.then(res => {
			if (res.data.status !== 'OK') {
				throw new Error('Could not fetch location!')
			}
			const coordinates = res.data.results[0].geometry.location
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ 
        position: coordinates,
        map: map,
      });
		})
		.catch(err => {
			console.log(err)
			alert(err.message) 
		})
}

form.addEventListener('submit', searchAddressHandler)
