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
    bmiWeightEl.value = convertWeight(bmiWeightEl.value);
    const url = 'https://fitness-calculator.p.rapidapi.com/dailycalorie?&height=' + bmiHeightEl.value + '&weight=' + bmiWeightEl.value + '&age=' + bmiAgeEl.value + '&gender=' + bmiGenderEl.value + '&activitylevel=' + bmiActLvlEl.value;
    function convertWeight(weight) {
        return Math.round(weight / 2.20);
        
    }
    
    const weight = parseFloat(bmiWeightEl.value);
    const convertedWeight = convertWeight(weight);
    
    console.log(convertedWeight);
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dec3f09420msh8e059b9b79497f5p1aa256jsn405523c4c89c',
            'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
    }
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        localStorage.setItem('bmiResults', JSON.stringify(result));
        
        let bmiTotEl = document.getElementById('metabolicRate')
        bmiTotEl.textContent = 'Your basal metabolic rate would be ' + result.data.BMR
        
        
        let gainWeightEl = document.getElementById('gainWeight')
        gainWeightEl.textContent = 'To gain weight you would need to average ' + result.data.goals["Weight gain"].calory + ' calories a day.'
        
        
        let loseWeightEl = document.getElementById('loseWeight')
        loseWeightEl.textContent = 'To lose weight you would need to average ' + result.data.goals["Weight loss"].calory + ' calories a day.'
        
        
        let mainWeightEl = document.getElementById('maintainWeight')
        mainWeightEl.textContent = 'To main weight you would need to average ' + result.data.goals["maintain weight"] + ' calories a day.'
        
        let resultsEl = document.getElementById('bmiResults')
        resultsEl.classList.remove('hidden');
        resultsEl.classList.add('show')
        
    } catch (error) {
        console.error(error);
    }
    
}

bmiBtn.addEventListener('click',getBmi);
const resultS = JSON.parse(localStorage.getItem('bmiResults'));



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
    localStorage.setItem('caloriesResults', JSON.stringify(result[0]));

        let calHrEl = document.getElementById('calAnHour')
        calHrEl.textContent = 'This excerise burns ' + result[0].calories_per_hour + ' calories an hour.'

        let durrMinEl = document.getElementById('durrationAct')
        durrMinEl.textContent = 'You excersiced for ' + result[0].duration_minutes + ' minutes.'

        let totCal = document.getElementById('totalCal')
        totCal.textContent = 'You burned ' + result[0].total_calories + ' calories in ' + result[0].duration_minutes + ' minutes. Great Job!'
        
        let resultsEl = document.getElementById('calResults')
        resultsEl.classList.remove('hidden');
        resultsEl.classList.add('show')
} catch (error) {
	console.error(error);
}
}
calBtn.addEventListener('click',getCal)

const result = JSON.parse(localStorage.getItem('caloriesResults'));