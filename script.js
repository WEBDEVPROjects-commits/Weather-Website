let displayof_noti = "none"
let noti_arrow = "0"
let width_after_cord = "35vw"
let width_after_city = "30vw"
let ask_city
function getdate() {
    let currentdate = new Date()
    const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekName = weekNames[currentdate.getDay()];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[currentdate.getMonth()];

    document.querySelector("#date").innerHTML = `${weekName},${currentdate.getDate()} ${monthName}`

}
function getcity() {
    document.querySelector(".weatherimg h1").innerHTML = city.toUpperCase()
}

function mood(temp) {
    if (temp < 15) {
        document.querySelector(".weather1").src = "snowing.png"
    }
    else if (temp >= 15 && temp < 25) {
        document.querySelector(".weather1").src = "snowing.png"
    }
    else if (temp >= 25 && temp < 40) {
        document.querySelector(".weather1").src = "suncloud.png"
        // document.querySelector("#temp").style.color="#dfb847"
    }
    else if (temp >= 40) {
        document.querySelector(".weather1").src = "sun.png"
        // document.querySelector("#temp").style.color="red"
    }

}
async function apicoordinates(cord1, cord2) {
    const apiKey = `6810ca5246c535df2bf224ec6dd3621f`
    try {
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cord1}&lon=${cord2}&appid=${apiKey}&units=metric`)
        console.log(resp)
        let json_obj = await resp.json()
        let temp = json_obj.main.temp
        console.log(json_obj)
        document.querySelector("#mood").innerHTML = json_obj.weather[0].description
        document.querySelector("#temp").innerHTML = `${temp}°`
        document.querySelector(".wind p").innerHTML = `Wind  |  ${json_obj.wind.speed}`
        document.querySelector(".humidity p").innerHTML = `Humidity  |  ${json_obj.main.humidity}%`
        document.querySelector(".weatherimg h1").innerHTML = json_obj.name

    } catch (error) {
        document.querySelector(".weatherimg h1").innerHTML = "Invalid Coordinates"
        console.log(error)
    }

}
async function apiCity(city) {
    console.log(city)
    const apiKey = `6810ca5246c535df2bf224ec6dd3621f`
    try {
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`)
        console.log(resp)
        let json_obj = await resp.json()
        let temp = json_obj.main.temp
        console.log(json_obj)
        document.querySelector("#mood").innerHTML = json_obj.weather[0].description
        document.querySelector("#temp").innerHTML = `${temp}°`
        document.querySelector(".wind p").innerHTML = `Wind  |  ${json_obj.wind.speed}`
        document.querySelector(".humidity p").innerHTML = `Humidity  |  ${json_obj.main.humidity}%`
        document.querySelector(".weatherimg h1").innerHTML = json_obj.name
        mood(temp)
    } catch (error) {
        document.querySelector(".weatherimg h1").innerHTML = "Invalid City"
    }

}

async function threehourforecast(city) {
    const apiKey = `6810ca5246c535df2bf224ec6dd3621f`
    return new Promise(async (resolve, reject) => {

        try {
            let resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${apiKey}&units=metric`)
            console.log(resp)
            let json_obj = await resp.json()
            console.log(json_obj)
            console.log(json_obj.list)
            console.log(json_obj.list[0].main)
            console.log(json_obj.list[0].main.temp_max)
            console.log(json_obj.list[0].dt_txt)
            let time = (json_obj.list[0].dt_txt).split(" ")[1].split(":")[0]
            console.log(time)
            let updatedtime = `${time}:00AM`
            if (time >= 13 && time <= 23) {
                updatedtime = `${time - 12}:00PM`
            }
            document.querySelector(".notification-click").insertAdjacentHTML("beforeend", `<div class="realnotification">
                    <img src="noti.png">
                    <p>The max temp. could reach ${json_obj.list[0].main.temp_max}° in ${json_obj.city.name}</p>
                    <p>${updatedtime}</p>
                 </div>`)
        } catch (error) {
            document.querySelector(".notification-click").insertAdjacentHTML("beforeend", `<div class="realnotification">
            <img src="noti.png">
            <p>You entered invalid city.<a href="#" onclick="location.reload()">Enter city again</a></p>
         </div>`)
        }
        resolve(1)
    })
}

function notidisplay() {
    if (displayof_noti == "none") {
        document.querySelector(".notification-click").style.display = "block"
        displayof_noti = "block"
    }
    else if (displayof_noti == "block") {
        document.querySelector(".notification-click").style.display = "none"
        displayof_noti = "none"
    }

}
function notirotate() {
    if (noti_arrow == "0") {
        document.querySelector("#noti-arrow").style.transform = "rotate(180deg)"
        noti_arrow = "180"
    }
    else if (noti_arrow == "180") {
        document.querySelector("#noti-arrow").style.transform = "rotate(0deg)"

        noti_arrow = "0"
    }

}
async function addsearchbar() {
    return new Promise((resolve, reject) => {
        let cord2 = document.querySelector("#cord2")
        let check = document.querySelector(".search-inputs").contains(cord2)
        if (!check) {
            document.querySelector(".search-inputs").insertAdjacentHTML("beforeend", `<input type="search" placeholder="Search here..." id="cord2">`)
        }
        resolve(1)
    })
}
async function removesearchbar() {
    return new Promise((resolve, reject) => {

        let cord2 = document.querySelector("#cord2")
        let check = document.querySelector(".search-inputs").contains(cord2)
        if (check) {
            cord2.remove()
        }
        resolve(1)
    })
}
function addnoticircle() {
    document.querySelector(".searchbar").insertAdjacentHTML("beforeend", `<div class="noti-circle"></div>`)
}
async function addinstruction() {
    return new Promise((resolve, reject) => {
        document.querySelector(".notification-click").insertAdjacentHTML("beforeend", `<div class="realnotification">
        <img src="noti.png">
        <p>You can Enter  your city again for every 3 hour weather update <a href="#" onclick="location.reload()">click here<a/></p>
        </div>`)
        resolve(1)
    })
}
async function main() {
    let choice
    setInterval(() => {
        getdate()
    }, 500);

    let citylistener = (e) => {
        let city = document.querySelector("#cord1").value
        console.log(city)
        apiCity(city)
        document.querySelector("#cord1").value = ""
    }

    let cordlistener = (e) => {
        console.log(choice)
        let cord1 = document.querySelector("#cord1").value
        let cord2 = document.querySelector("#cord2").value
        console.log(cord1, cord2)
        apicoordinates(cord1, cord2)
        document.querySelector("#cord1").value = ""
        document.querySelector("#cord2").value = ""
    }

    document.querySelector("#Search-choice").addEventListener("change", async (e) => {
        choice = document.querySelector("#Search-choice").value
        console.log(choice)

        if (choice == "city") {
            document.querySelector("#search-picture").removeEventListener("click", cordlistener)
            await removesearchbar()
            document.querySelector("#cord1").style.width = width_after_city
            document.querySelector("#cord1").placeholder = "City name..."
            document.querySelector("#search-picture").addEventListener("click", citylistener)
        }

        else if (choice == "coordinates") {
            document.querySelector("#search-picture").removeEventListener("click", citylistener)
            // 30.773225861421427, 76.793370245555
            await addsearchbar()
            document.querySelector("#cord1").style.width = width_after_cord
            document.querySelector("#cord2").style.width = width_after_cord
            document.querySelector("#cord1").placeholder = "Coordinate 1..."
            document.querySelector("#cord2").placeholder = "Coordinate 2..."
            document.querySelector("#search-picture").addEventListener("click", cordlistener)
        }
    })

    document.querySelector("#noti").addEventListener("click", (e) => {
        let check = document.querySelector(".searchbar").contains(document.querySelector(".noti-circle"))
        if (check) {
            document.querySelector(".noti-circle").remove()
        }
        notirotate()
        notidisplay()
    })
    document.querySelector("#ask-cancelbutton").addEventListener("click", async (e) => {
        document.querySelector(".ask-location").style.display = "none"
        document.querySelector(".container").classList.remove("blur")
        await addinstruction();
        addnoticircle()
    })

    document.querySelector("#ask-submit").addEventListener("click", async (e) => {
        ask_city = document.querySelector(".ask-city input").value
        if (ask_city != "") {
            document.querySelector(".ask-location").style.display = "none"
            document.querySelector(".container").classList.remove("blur")
            document.querySelector(".ask-city input").value = ""
            await threehourforecast(ask_city)
            addnoticircle()
        }
        else {
            document.querySelector(".ask-city input").placeholder = "no city entered..."
        }


    })
}
main()
