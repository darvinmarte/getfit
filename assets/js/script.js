// once user opens deployed application they are presented with a decent UI
// user inputs height, weight, age in first container .bmiInput
// press a .calcBmi button 
// presented with bmi results in second container .bmiRes
// user inputs activity, weight and duration in container .calInput
// press a #calBurn button
// presented with calories burned based on activity

let inputEl1 = document.querySelector(".bmiInput");
let bmiBtn = document.querySelector(".calcBmiBtn");
// let bmiRes = document.querySelector(".");
let inputEl2 = document.querySelector(".calInput");
let calBurn = document.querySelector(".calBtn");
// let exerciseDiv = document.querySelector(#exerciseDiv);
console.log(bmiBtn);
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



        // result.forEach(exercise => {
        //     // create element
        //     let nameEl = document.createElement("p")
        //     nameEl.textContent = exercise.name
        //     exercise.append(nameEl)
        // });

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

//Localstorage
//get and set item 