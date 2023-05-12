// once user opens deployed application they are presented with a decent UI
// user inputs height, weight, age, gender, activity level in first container .bmiInput
// press a .calcBmi button 
// presented with bmi results in second container .bmiRes
// user inputs activity, weight and duration in container .calInput
// press a #calBurn button
// presented with calories burned based on activity

let inputEl1 = document.querySelector(".bmiInput");
let bmiBtn = document.querySelector(".calcBmiBtn");
// let bmiRes = document.querySelector(".");
let inputEl2 = document.querySelector(".calInput");
let calBtn = document.getElementById("calBurnBtn");
const activity = document.querySelector('#activity')
let exceriseDiv = document.querySelector('#excerciseDiv')
let weightEl = document.querySelector('.actWeight')
let durrEl = document.querySelector('.duration')

//Fetch bmiInput API
//RESPONSE
//DATA
//PRESENT THE RESULTS FROM bmiInput on page
//store it in local storage 
const repoList = document.querySelector('ul');
const fetchButton = document.getElementById('fetch-button');

//getApi function is called when the fetchButton is clicked

async function getBmi() {
    const url = 'https://fitness-calculator.p.rapidapi.com/dailycalorie?&units=imperial&age=25&height=180&weight=70&gender=male&activitylevel=level_1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dec3f09420msh8e059b9b79497f5p1aa256jsn405523c4c89c',
            'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
}

bmiBtn.addEventListener('click',getBmi);

//Fetch calInuput API
//RESPONSE
//DATA
//PRESENT THE RESULTS FROM bmiInput on page
//store it in local storage 

async function getCal() {
    const url = 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=' + activity.value + '&weight=' + weightEl.value + '&duration=' + durrEl.value;
    console.log(activity.value)
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dec3f09420msh8e059b9b79497f5p1aa256jsn405523c4c89c',
		'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
     // Store the result in local storage
    localStorage.setItem('caloriesResults', JSON.stringify(result[0]));

        let calHrEl = document.createElement('p')
        calHrEl.textContent = 'This excerise burns ' + result[0].calories_per_hour + ' calories an hour.'
        exceriseDiv.append(calHrEl)

        let durrMinEl = document.createElement('p')
        durrMinEl.textContent = 'You did ' + activity.value + ' for ' + result[0].duration_minutes + ' minutes.'
        exceriseDiv.append(durrMinEl)

        let totCal = document.createElement('p')
        totCal.textContent = 'Your burned ' + result[0].total_calories + ' calories in ' + result[0].duration_minutes + ' minutes. Great Job!'
        exceriseDiv.append(totCal)

} catch (error) {
	console.error(error);
}
}

calBtn.addEventListener('click',getCal)
const result = JSON.parse(localStorage.getItem('caloriesResults'));