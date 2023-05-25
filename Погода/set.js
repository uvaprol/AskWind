const DataIMG = {
    'Clear':  'url(./img/cloudy_bg.svg)',
    'Clouds': 'url(./img/cloud_bg.svg)',
    'Rain':   'url(./img/rain_bg.svg)',
}

const DataColor = {
    'Clear':  '#17FDFBa1',
    'Clouds': '#656598a1',
    'Rain':   '#4F7CC3a1',
}

const DataBodyColor = {
    'Clear':  '#1DEEEEa1',
    'Clouds': '#646496a1',
    'Rain':   '#4B78BFa1',
}

const weather_btn = document.getElementById('box-temperature')
const tempValue = document.getElementById('temperature')
const windValue = document.getElementById('wind')
const uvValue = document.getElementById('visibility')
const wetValue = document.getElementById('wet')
const pressureValue = document.getElementById('pressure')
const btn = document.getElementById('btn')
const APIKey = ''// your ApiKey (https://openweathermap.org)










function clean(){
    document.getElementById('input').value = ''
    return
}

function search(){

    let city = document.getElementById('input').value.toLowerCase()
    if (city === ''){
        return
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    .then(response => response.json())
    .then
        (json => {
            

            if (json.cod === '404'){
                document.getElementById('input').value = ''
                document.getElementById('input').placeholder = 'Не верный город'
                
                return
            }

            document.getElementById('input').placeholder = 'Введите город или страну'
            const weather = json.weather[0].main
            


            

            btn.style.backgroundColor = DataColor[weather]
            btn.style.border = `3px solid ${DataColor[weather]}`

            let temp = Number(json.main.temp)
            temp = Math.floor(temp - 273,15)

            let visibility = Number(json.visibility)
            visibility /=  1000

            let speed = json.wind.speed
            speed = Math.floor(speed)

            
            document.body.style.background = DataBodyColor[weather]

            weather_btn.style.background = DataIMG[weather]
            weather_btn.style.backgroundRepeat = "no-repeat"
            weather_btn.style.backgroundPosition = "center"


            


            if (temp >= 0){
                tempValue.innerHTML = '<span class="title-span">+</span>' + temp
            }
            else{
                tempValue.innerHTML = temp
            }

            pressureValue.innerHTML = json.main.pressure + '<span class="title-span">гПа</span>'
            windValue.innerHTML = speed + '<span class="title-span">м/с</span>'
            wetValue.innerHTML = json.main.humidity + '<span class="title-span">%</span>'
            uvValue.innerHTML = visibility + '<span class="title-span">km</span>'



            city = city[0].toUpperCase() + city.slice(1, city.length).toLowerCase()
            document.getElementById('input').value = city

            return
        })
}






window.addEventListener('load', search())
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search()
    }
});




