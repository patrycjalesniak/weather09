import './sass/main.scss'

let cityForm = document.querySelector('.weather__form')
let cityInput = document.querySelector('.weather__city')
let APIURL = 'http://api.weatherapi.com/v1/current.json?key=29671f6513d54123bd0172148221512&aqi=yes&q='
let apiView = document.querySelector('.weather__data')
let video = document.querySelector('.weather__bg')

cityForm.addEventListener('submit',(event) => {
    let city = cityInput.value
    if(city.length <=3){
        cityInput.classList.add('weather__city--error')

    } else{
        cityInput.classList.remove('weather__city--error')

        let APIURLWITHCITY = APIURL + city
        console.log(APIURLWITHCITY)
        fetch(APIURLWITHCITY)
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }
                else {
                    return showError()
                }
                
            })

            .then((dataFromAPI) =>{
                // console.log(dataFromAPI.current.temp_c)
                let view = '';
                // ${dataFromAPI.current.temp_c}
                view += `<div class="weather__location">${dataFromAPI.location.name} - ${dataFromAPI.location.country}</div>`
                view += `<div class="weather__info">`
                // icon
                view += `<div class="weather__icon"> <img src="${dataFromAPI.current.condition.icon}" alt="${dataFromAPI.current.condition.text}"> 
                 </div>`

                 view += `<div class="weather__temp">
                         <span class="weather__num">${dataFromAPI.current.temp_c} </span>
                         <span class="weather__unit"> &deg;C </span>
                    </div>`
                
                 view += `<div class="weather__desc">
                    <p class="weather__text">The amount of rainfall: ${dataFromAPI.current.precip_mm}mm</p>
                    <p class="weather__text">Humidity:${dataFromAPI.current.humidity}%</p>
                    <p class="weather__text">Wind spreed:${dataFromAPI.current.wind_kph}kph</p>
                  </div>`

                view += `</div>`


                apiView.innerHTML = view
                // video.setAttribute('src','/video/' + dataFromAPI.current.condition.code +'.mp4')
                // video.play()

            })
    }


    event.preventDefault()
})

cityInput.addEventListener('keyup',() => {
    let city = cityInput.value
    if(city.length <=3){
        cityInput.classList.add('weather__city--error')

    } else{
        cityInput.classList.remove('weather__city--error')
    }

})

let showError = () =>{
    apiView.innerHTML = `<div class="weather__error">City not found or we have problem with API </div>`
}

