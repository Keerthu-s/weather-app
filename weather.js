console.log("Hello World!");

const weather = document.getElementById("weather");

function loadspinanimate()
{
    weather.style.visibility = "visible";
    weather.style.display = "flex"; //centers the spinner
    weather.style.flexDirection = "row";
    weather.style.flexWrap = "wrap";
    weather.style.justifyContent = "center";
    weather.style.alignItems = "center";
    weather.innerHTML = `<div class="spin"></div>`;
	getLocation();
}

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(callbackfunc);
	}
	else {
		console.log("Geolocation is not supported");
	}
}

function displayDetails(data) {
	var crt_time = data.current_weather.time;
	var time_arr = data.hourly.time;
	var index = time_arr.indexOf(crt_time);
    if(index == -1) {
        console.log("index is : "+index);
        var crtT = crt_time.split(":");
        var str = "";
        for(let i = 0;i < time_arr.length;i++) {
            str = time_arr[i]; 
            let word = str.split(":");
            if(word[0] == crtT[0]) {
                index = i;
            }
        }
        if(index == -1) {
            console.log("The index is not found, kindly check for errors!, default index to 0");
            index = 0;
        }
        else {
            console.log("negative index detected, and found the correct index as:" + index);
        }
    }
	weather.innerHTML = `
	<table>
		<tr>
			<td>Temperature</td>
			<td>${data.current_weather.temperature} °C</td>
		</tr>
		<tr>
			<td>Apparent Temperature</td>
			<td>${data.hourly.apparent_temperature[index]} ${data.hourly_units.apparent_temperature}</td>
		</tr>
		<tr>
			<td>Humidity</td>
			<td>${data.hourly.relativehumidity_2m[index]} ${data.hourly_units.relativehumidity_2m}</td>
		</tr>
		<tr>
			<td>Precipitation</td>
			<td>${data.hourly.precipitation_probability[index]} ${data.hourly_units.precipitation_probability}</td>
		</tr>
		<tr>
			<td>Rain</td>
			<td>${data.hourly.rain[index]} ${data.hourly_units.rain}</td>
		</tr>
		<tr>
			<td>Visibility</td>
			<td>${data.hourly.visibility[index]} ${data.hourly_units.visibility}</td>
		</tr>
		<tr>
			<td>Cloud Cover</td>
			<td>${data.hourly.cloudcover[index]} ${data.hourly_units.cloudcover}</td>
		</tr>
		<tr>
			<td>Radiation</td>
			<td>${data.hourly.direct_radiation[index]} ${data.hourly_units.direct_radiation}</td>
		</tr>
		<tr>
			<td>Wind Speed</td>
			<td>${data.hourly.windspeed_10m[index]} ${data.hourly_units.windspeed_10m}</td>
		</tr>
		<tr>
			<td>Wind Direction</td>
			<td>${data.current_weather.winddirection} deg</td>
		</tr>
		<tr>
			<td>Elevation</td>
			<td>${data.elevation} m</td>
		</tr>
		<tr>
			<td>Weather Code</td>
			<td>${data.current_weather.weathercode}</td>
		</tr>
		<tr>
			<td>Latitude</td>
			<td>${data.latitude}</td>
		</tr>
		<tr>
			<td>Longitude</td>
			<td>${data.longitude}</td>
		</tr>
		<tr>
			<td>Day</td>
			<td>${data.current_weather.is_day}</td>
		</tr>
	</table>`;
}

let api = "https://api.open-meteo.com/v1/forecast?"
let params = "&hourly=temperature_2m&hourly=precipitation_probability&hourly=visibility&hourly=rain&hourly=cloudcover&hourly=relativehumidity_2m&hourly=direct_radiation&hourly=apparent_temperature&hourly=windspeed_10m&current_weather=true";
let latitude = 12.8996;
let longitude = 80.2209;

function callbackfunc(position) {
	console.log(position);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	getWeather();
}

//async function is still required!!
async function getWeather() {
	let url = api + "latitude=" + latitude + "&longitude=" + longitude + params;
	const response = await fetch(url);
	let result = await response.json();
	console.log(result);
	displayDetails(result);
}

//loadspinanimate();
//getLocation(); // call back function will run getWeather()
//getWeather();
// For changing the width of the container
if(window.innerWidth < 727)
{
    const cont = document.getElementsByClassName('container');
    let x;
    for(let n = 0;n < cont.length;n++)
    {
        x = cont[n];
        x.style.width = '95%';
    }
}

//GowyContainer Starts
//To Change to height of empty div to push footer to the bottom
if(document.getElementsByClassName('glowycontainer').length)
{
	const cont = document.getElementsByClassName('glowycontainer');
	x = cont[0];
	let a = '';
	a = (window.innerHeight - 288) + 'px';
	if(window.innerHeight < 288)
	{
    	x.style.height = '0px'; 
	}
	else
	{
    	x.style.height = a; 
	}
	if(window.innerWidth < 727)
	{
    	const cont = document.getElementsByClassName('glowycontainer');
    	let x;
    	for(let n = 0;n < cont.length;n++)
    	{
        	x = cont[n];
        	x.style.width = '95%';
    	}
	}
}
//GlowyContainer Ends
//For Popup BoxStart
//This state variable is a dependancy for the popup component
let state = 0;
function popupon()
{
    if(state == 0)
    {
        //Setting the state to active so that popupoff will run.
        state = 1;
        const popup = document.getElementById('popup-box');
        //Note: the visibility property of this element must be set to 'invisible' before itself
        popup.style.visibility = "visible";
        popup.style.width = "120px";
        popup.style.height = "140px";
        popup.style.background = "white";
        popup.style.top = "100%";
        popup.style.left = "100%";
        if(/Mobi/i.test(window.navigator.userAgent))
        {
            //this case works for desktop browser
            //After refreshing the page, the window.innerHeight and .outerHeight are different
            //For desktop browsers [I beleive] alone the difference between these heights is 
            //Greater than 105.
            popup.style.transform = "translate(-130px, -"+(window.outerHeight-65)+"px)";
        }
        else
        {
            //this case works for mobile browser
            popup.style.transform = "translate(-130px, -"+(window.innerHeight-65)+"px)";
        }
    }
    else
    {
        popupoff()
    }

/*    if(window.innerWidth < 715)
    {
        popup.style.top = "100%";
        popup.style.left = "100%";
        popup.style.transform = "translate(-130px, -346%)";
    }
    else
    {
        let factor = 0;
        factor = (window.innerWidth * 0.1)-(window.innerWidth*0.0325);
        popup.style.transform = "translate("+factor+"%, 0%)";
        console.log("translate(-"+factor+"%, 0%)");
    }*/
    //popup.style.transform = "translate(10%, 10%, 1%)";
}

function popupoff()
{
    //This state is used to verify that the popup is currently active
    state = 0;
    //We set the state again to inactive so that poupon will run [see popupon]
    const popup = document.getElementsByClassName('popup');
    for(let i = 0;i < popup.length;i++)
    {
        popup[i].style = "visibility: collapse;";
    }
    
    /*popup.style.color = "transparent";
    popup.style.width = "0px";
    popup.style.height = "0px"; */
    //console.log("ha ha")
}

//Popup Box Ends




