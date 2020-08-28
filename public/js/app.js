
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location  = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''


    fetch('/weather?address='+location).then( (response) => {
 response.json().then( (data) => {
     if (data.error) {

         // console.log(data.error)
         messageOne.textContent = data.error

     }
     else {

        messageOne.textContent = 'Your location is '+data.location 
        messageTwo.textContent =  'The forecast is '+data.forecast+' degrees celcius.'

         console.log(data.location)
         console.log(data.forecast)
     }
 })
})

//    console.log(location)
})