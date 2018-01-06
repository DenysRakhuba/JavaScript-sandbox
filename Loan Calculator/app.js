const form = document.getElementById("loan-form");
form.addEventListener('submit', function(e){
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculation, 2000)
    e.preventDefault();    
});

function calculation() {
    // Calculator fields
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");

    const monthPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    const amountValue = parseFloat(amount.value);
    const interestValue = parseFloat(interest.value) / 100 / 12;
    const yearsValue = parseFloat(years.value) * 12;

    const x = Math.pow(1 + interestValue, yearsValue);
    const monthly = (amountValue * x * interestValue)/(x-1);

    if(isFinite(monthly)) {
        monthPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * yearsValue).toFixed(2);
        totalInterest.value = ((monthly * yearsValue) - amountValue).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError("Check your numbers");
        document.getElementById('loading').style.display = 'none';
    }
}

function showError(error) {
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);

    setTimeout(hideError, 3000);
}

function hideError() {
    document.querySelector('.alert').remove();
}