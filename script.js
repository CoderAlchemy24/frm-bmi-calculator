const metricRadio = document.getElementById("metric");
const imperialRadio = document.getElementById("imperial");

const metricInputs = document.querySelector(".metric-inputs");
const imperialInputs = document.querySelector(".imperial-inputs");

// Metric inputs
const heightMetric = document.getElementById("height-metric");
const weightMetric = document.getElementById("weight-metric");

// Imperial inputs
const heightFt = document.getElementById("height-ft");
const heightIn = document.getElementById("height-in");
const weightSt = document.getElementById("weight-st");
const weightLbs = document.getElementById("weight-lbs");

const welcomeText = document.querySelector(".result-welcome-text");
const resultValue = document.querySelector(".result-value");
const resultText = document.querySelector(".result-text");

// Alapértelmezett metric kiválasztása
metricRadio.checked = true;
showMetricInputs();

function showMetricInputs() {
  metricInputs.style.display = "grid";
  imperialInputs.style.display = "none";
  clearAllInputs();
  calculateBMI();
}

function showImperialInputs() {
  metricInputs.style.display = "none";
  imperialInputs.style.display = "flex";
  clearAllInputs();
  calculateBMI();
}

function clearAllInputs() {
  heightMetric.value = "";
  weightMetric.value = "";
  heightFt.value = "";
  heightIn.value = "";
  weightSt.value = "";
  weightLbs.value = "";
}

function calculateBMI() {
  let height = 0;
  let weight = 0;
  let isValid = false;

  if (metricRadio.checked) {
    // Metric számítás
    const h = parseFloat(heightMetric.value);
    const w = parseFloat(weightMetric.value);

    if (h > 0 && w > 0) {
      height = h; // cm-ben
      weight = w; // kg-ban
      isValid = true;
    }
  } else {
    // Imperial számítás
    const ft = parseFloat(heightFt.value) || 0;
    const inches = parseFloat(heightIn.value) || 0;
    const st = parseFloat(weightSt.value) || 0;
    const lbs = parseFloat(weightLbs.value) || 0;

    if ((ft > 0 || inches > 0) && (st > 0 || lbs > 0)) {
      // Magasság átváltása inch-re, majd cm-re
      const totalInches = ft * 12 + inches;
      height = totalInches * 2.54; // cm-ben

      // Súly átváltása font-ra, majd kg-ra
      const totalLbs = st * 14 + lbs;
      weight = totalLbs * 0.453592; // kg-ban

      isValid = true;
    }
  }

  if (!isValid) {
    welcomeText.style.display = "block";
    resultValue.style.display = "none";
    resultText.innerText =
      "Enter your height and weight to see your BMI result.";
    return;
  }

  // BMI számítás (mindig kg és cm alapján)
  const bmi = weight / (height / 100) ** 2;
  resultValue.textContent = bmi.toFixed(1);

  // BMI kategóriák
  let category;
  if (bmi < 18.5) {
    category = "underweight";
  } else if (bmi < 25) {
    category = "a healthy weight";
  } else if (bmi < 30) {
    category = "overweight";
  } else {
    category = "obese";
  }

  // Ideális súly számítása
  const heightM = height / 100;
  let idealWeight;

  if (metricRadio.checked) {
    const minWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxWeight = (24.9 * heightM * heightM).toFixed(1);
    idealWeight = minWeight + "kgs - " + maxWeight + "kgs";
  } else {
    const minWeightKg = 18.5 * heightM * heightM;
    const maxWeightKg = 24.9 * heightM * heightM;
    const minWeightLbs = (minWeightKg * 2.20462).toFixed(1);
    const maxWeightLbs = (maxWeightKg * 2.20462).toFixed(1);
    idealWeight = minWeightLbs + "lbs - " + maxWeightLbs + "lbs";
  }
  welcomeText.style.display = "none";
  resultValue.style.display = "block";

  resultText.innerHTML =
    "Your BMI suggests you're <span>" +
    category +
    "</span>. Your ideal weight is between <span>" +
    idealWeight +
    "</span>.";
}

// Event listener-ek
metricRadio.addEventListener("change", showMetricInputs);
imperialRadio.addEventListener("change", showImperialInputs);

// Metric input listener-ek
heightMetric.addEventListener("input", calculateBMI);
weightMetric.addEventListener("input", calculateBMI);

// Imperial input listener-ek
heightFt.addEventListener("input", calculateBMI);
heightIn.addEventListener("input", calculateBMI);
weightSt.addEventListener("input", calculateBMI);
weightLbs.addEventListener("input", calculateBMI);

// Kezdeti számítás
calculateBMI();
welcomeText.style.display = "block";
resultValue.style.display = "none";
resultText.innerHTML = "Enter your height and weight to see your BMI result.";
