// !once user opens deployed application they are presented with a decent UI
// !user inputs height, weight, age, gender, activity level in first container .bmiInput
// !press a .calcBmi button 
// !presented with cal results in second container .bmiRes
// !user inputs activity, weight and duration in container .calInput
// !press a #calBurn button
// !presented with calories burned based on activity

let inputEl1 = document.querySelector(".bmiInput");
let bmiBtn = document.querySelector(".calcBmiBtn");
let bmiResDiv = document.querySelector("#bmiResDiv");
let bmiHeightEl = document.querySelector('.height');
let bmiWeightEl = document.querySelector('.weight');
let bmiAgeEl = document.querySelector(".age");
let bmiGenderEl = document.querySelector('#gender');
let bmiActLvlEl = document.querySelector('#activityLevel');
let inputEl2 = document.querySelector(".calInput");
let calBtn = document.getElementById("calBurnBtn");
const activity = document.querySelector('#activity')
let exceriseDiv = document.querySelector('#excerciseDiv')
let weightEl = document.querySelector('.actWeight')
let durrEl = document.querySelector('.duration')

const repoList = document.querySelector('ul');
const fetchButton = document.getElementById('fetch-button');

async function getBmi() {
    console.log (bmiHeightEl.value);
    console.log (bmiWeightEl.value);
    console.log (bmiAgeEl.value);
    console.log (bmiGenderEl.value);
    console.log (bmiActLvlEl.value);
    const url = 'https://fitness-calculator.p.rapidapi.com/dailycalorie?&height=' + bmiHeightEl.value + '&weight=' + bmiWeightEl.value + '&age=' + bmiAgeEl.value + '&gender=' + bmiGenderEl.value + '&activitylevel=' + bmiActLvlEl.value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dec3f09420msh8e059b9b79497f5p1aa256jsn405523c4c89c',
            'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        let bmiTotEl = document.createElement('p')
        bmiTotEl.textContent = 'Your basal metabolic rate would be ' + result.data.BMR
        bmiResDiv.append(bmiTotEl)

        let gainWeightEl = document.createElement('p')
        gainWeightEl.textContent = 'To gain weight you would need to average ' + result.data.goals["Weight gain"].calory + ' calories a day.'
        bmiResDiv.append(gainWeightEl)

        let loseWeightEl = document.createElement('p')
        loseWeightEl.textContent = 'To lose weight you would need to average ' + result.data.goals["Weight loss"].calory + ' calories a day.'
        bmiResDiv.append(loseWeightEl)

        let mainWeightEl = document.createElement('p')
        mainWeightEl.textContent = 'To main weight you would need to average ' + result.data.goals["maintain weight"] + ' calories a day.'
        bmiResDiv.append(mainWeightEl)

    } catch (error) {
        console.error(error);
    }
}

bmiBtn.addEventListener('click',getBmi);

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

        let calHrEl = document.getElementById('calAnHour')
        calHrEl.textContent = 'This excerise burns ' + result[0].calories_per_hour + ' calories an hour.'

        let durrMinEl = document.getElementById('durrationAct')
        durrMinEl.textContent = activity.value + ' for ' + result[0].duration_minutes + ' minutes.'

        let totCal = document.getElementById('totalCal')
        totCal.textContent = 'Your burned ' + result[0].total_calories + ' calories in ' + result[0].duration_minutes + ' minutes. Great Job!'

} catch (error) {
	console.error(error);
}
}

calBtn.addEventListener('click',getCal)
const result = JSON.parse(localStorage.getItem('caloriesResults'));