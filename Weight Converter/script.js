let lbs = document.getElementById('lbs');
let kgs = document.getElementById('kilogramsOutput');
let gms = document.getElementById('gramsOutput');
let ounces = document.getElementById('ouncesOutput');
let pounds = document.getElementById('poundsOutput');
let output = document.getElementById('output');
let units = document.getElementById('units');

output.style.display = "none";

lbs.addEventListener('input', getValue);

function getValue(e) {
  let inputValue = e.target.value;
  let unitsValue = units.value;
  output.style.display = "block";
  if (unitsValue == "Pounds") {
    kgs.parentElement.parentElement.style.display = "block";
    gms.parentElement.parentElement.style.display = "block";
    ounces.parentElement.parentElement.style.display = "block";
    pounds.parentElement.parentElement.style.display = "none";
    kgs.innerHTML = inputValue/2.2046;
    gms.innerHTML = inputValue/0.0022046;
    ounces.innerHTML = inputValue*16;
  } else if (unitsValue == "Kilograms") {
    kgs.parentElement.parentElement.style.display = "none";
    gms.parentElement.parentElement.style.display = "block";
    ounces.parentElement.parentElement.style.display = "block";
    pounds.parentElement.parentElement.style.display = "block";
    gms.innerHTML = inputValue*1000;
    ounces.innerHTML = inputValue*35.274;
    pounds.innerHTML = inputValue*2.2046;
  } else if (unitsValue == "Grams") {
    gms.parentElement.parentElement.style.display = "none";
    kgs.parentElement.parentElement.style.display = "block";
    ounces.parentElement.parentElement.style.display = "block";
    pounds.parentElement.parentElement.style.display = "block";
    kgs.innerHTML = inputValue/1000;
    ounces.innerHTML = inputValue*0.035274;
    pounds.innerHTML = inputValue/453.59237;
  } else if (unitsValue == "Ounces") {
    ounces.parentElement.parentElement.style.display = "none";
    kgs.parentElement.parentElement.style.display = "block";
    gms.parentElement.parentElement.style.display = "block";
    pounds.parentElement.parentElement.style.display = "block";
    kgs.innerHTML = inputValue/35.274;
    gms.innerHTML = inputValue/0.035274;
    pounds.innerHTML = inputValue/16;
  }
}
