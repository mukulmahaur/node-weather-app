console.log("this is getting here")

//  fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
//  })

const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(weatherInput.value)

    fetch('http://localhost:3000/weather?address='+weatherInput.value).then((response)=>{
    response.json().then((data)=>{
        if(!data.error){
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            messageOne.style.color = '#006400'
        }else{
            console.log(data.error)
            messageOne.textContent = data.error
            messageOne.style.color = '#FF0000'
        }        
    })
})

})