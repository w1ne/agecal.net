function saveDateOfBirth() {
	const dob = document.getElementById('dateInput').value;
	localStorage.setItem('dob', dob);
}

// This is the function that gets called after the age is calculated.
// It will display the fun fact button.
function showFunFactButton() {
	document.getElementById("funFactButton").style.display = "block";
}

const savedDob = localStorage.getItem('dob');

if (savedDob === null) {
	// DOB wasn't saved before. Handle this case.
	// You can either set a default value:
	const defaultDob = "1990-01-01"; // Example default value
	document.getElementById('dateInput').value = defaultDob;

	// OR you can prompt the user:
	// alert("Please enter your Date of Birth");
	// Or better, use a more user-friendly modal or on-screen message.
} else {
	// Use the savedDob as needed
	document.getElementById('dateInput').value = savedDob;
}

var maininput = document.getElementById("dateInput");

function setSession() {
	if (maininput.value != "") {
		sessionStorage.mySession = maininput.value;
	} else {
		sessionStorage.mySession = "1991-08-27"; // Default value if input is empty
	}
	saveDateOfBirth();
}

function calculateAge(dob) {
	const birthDate = new Date(dob);
	const currentDate = new Date();
	let age = currentDate.getFullYear() - birthDate.getFullYear();
	const monthDifference = currentDate.getMonth() - birthDate.getMonth();

	if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

let timerInterval;

function calculateAndDisplayAge() {
	const birthDate = new Date(maininput.value);
	const currentDate = new Date();

	let ageDifference = currentDate - birthDate;

	const years = Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000));
	ageDifference -= years * 365.25 * 24 * 60 * 60 * 1000;

	const months = Math.floor(ageDifference / (30 * 24 * 60 * 60 * 1000));
	ageDifference -= months * 30 * 24 * 60 * 60 * 1000;

	const days = Math.floor(ageDifference / (24 * 60 * 60 * 1000));

	// Display the combined age
	document.getElementById("combinedAgeDisplay").innerHTML = `Your Age:<br><span class="highlighted">${years}</span> YEARS, <span class="highlighted">${months}</span> MONTHS, <span class="highlighted">${days}</span> DAYS`;

	// Display the detailed age
	document.getElementById("yearsDisplay").textContent = `${years} Years`;
	document.getElementById("monthsDisplay").textContent = `${years * 12 + months} Months`;
	document.getElementById("weeksDisplay").textContent = `${Math.floor((years * 365.25 + months * 30 + days) / 7)} Weeks`;
	document.getElementById("daysDisplay").textContent = `${Math.floor(years * 365.25 + months * 30 + days)} Days`;
	document.getElementById("hoursDisplay").textContent = `${Math.floor(years * 365.25 * 24 + months * 30 * 24 + days * 24)} Hours`;
	document.getElementById("minutesDisplay").textContent = `${Math.floor(years * 365.25 * 24 * 60 + months * 30 * 24 * 60 + days * 24 * 60)} Minutes`;
	document.getElementById("secondsDisplay").textContent = `${Math.floor(years * 365.25 * 24 * 60 * 60 + months * 30 * 24 * 60 * 60 + days * 24 * 60 * 60)} Seconds`;

	// Calculate statistics based on age in days
	const dayStat = Math.floor((years * 365.25) + (months * 30) + days);

	document.getElementById("timeSlept").textContent = calculateTimeSlept(dayStat) + " days";
	document.getElementById("heartbeats").textContent = calculateHeartbeats(dayStat).toLocaleString(); // added toLocaleString() for better formatting
	document.getElementById("breathsTaken").textContent = calculateBreathsTaken(dayStat).toLocaleString();
	document.getElementById("stepsTaken").textContent = calculateStepsTaken(dayStat).toLocaleString();
	document.getElementById("mealsEaten").textContent = calculateMealsEaten(dayStat).toLocaleString();
	document.getElementById("wordsSpoken").textContent = calculateWordsSpoken(dayStat).toLocaleString();
	document.getElementById("booksRead").textContent = calculateBooksRead(years);
	document.getElementById("dreamsHad").textContent = calculateDreamsHad(dayStat).toLocaleString();
	document.getElementById("blinks").textContent = calculateBlinks(dayStat).toLocaleString();
	document.getElementById("laughs").textContent = calculateLaughs(dayStat).toLocaleString();
	document.getElementById("hairGrowth").textContent = calculateHairGrowth(years) + " inches";
	document.getElementById("nailGrowth").textContent = calculateNailGrowth(dayStat) + " inches";
	document.getElementById("waterDrank").textContent = (dayStat * 2).toLocaleString() + " liters";
	document.getElementById("songsListened").textContent = (dayStat * 15).toLocaleString() + " songs";
	document.getElementById("milesWalked").textContent = (dayStat * 2.5).toLocaleString() + " miles";

	// Display the statistics div
	document.getElementById("statisticsDisplay").style.display = "block";

	// Start live timer for seconds
	if (timerInterval) {
		clearInterval(timerInterval);
	}
	timerInterval = setInterval(() => {
		const currentSeconds = parseInt(document.getElementById("secondsDisplay").textContent.split(" ")[0]);
		document.getElementById("secondsDisplay").textContent = `${currentSeconds + 1} Seconds`;
	}, 1000);

	document.getElementById("ageDisplay").style.display = "block";
}

function checkStatus() {
	gtag('event', 'active', { 'event_category': 'active', 'event_label': 'active' });
}

stillHere = setInterval(
	function () {
		checkStatus();
	}, 15000);

// Calculate time slept based on age in days (assuming 8 hours sleep/day)
function calculateTimeSlept(days) {
	return Math.floor(days * (8 / 24)); // 8 hours out of 24 hours in a day
}

// Calculate heartbeats based on age in days (assuming an average of 80 beats/minute)
function calculateHeartbeats(days) {
	return Math.floor(days * 24 * 60 * 80); // 24 hours, 60 minutes/hour, 80 beats/minute
}

function calculateBreathsTaken(days) {
	return Math.floor(days * 24 * 60 * 16); // 24 hours, 60 minutes/hour, 16 breaths/minute
}

function calculateStepsTaken(days) {
	return Math.floor(days * 4500); // 4500 steps/day
}

function calculateMealsEaten(days) {
	return Math.floor(days * 3); // 3 meals/day
}

function calculateWordsSpoken(days) {
	return Math.floor(days * 7000); // 7000 words/day
}

function calculateBooksRead(years) {
	return Math.floor(years * 5); // 5 books/year
}

function calculateDreamsHad(days) {
	return Math.floor(days * 5); // Average 5 dreams/night
}

function calculateBlinks(days) {
	return Math.floor(days * 24 * 60 * 17.5); // 24 hours, 60 minutes/hour, average 17.5 blinks/minute
}

function calculateLaughs(days) {
	return Math.floor(days * 17); // 17 laughs/day
}

function calculateHairGrowth(years) {
	return (years * 6).toFixed(2); // 6 inches/year, toFixed for decimal places
}

function calculateNailGrowth(days) {
	const growthInMM = days * (3.5 / 30); // 3.5mm/month
	const growthInInches = growthInMM / 25.4; // Convert mm to inches
	return growthInInches.toFixed(2);
}

