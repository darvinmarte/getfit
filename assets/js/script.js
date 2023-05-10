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
    result.forEach(exercise => {
        //create element 
        let nameEl = document.createElement('p')
        nameEl.textContent = exercise.name
        exceriseDiv.append(nameEl)
    });

} catch (error) {
	console.error(error);
}
}

calBtn.addEventListener('click',getCal)

//Localstorage
//get and set item