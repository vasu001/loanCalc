// Listen to submit
const formSubmit = document.querySelector('#loan-form');

// Add Event Listener & Calculate Results
formSubmit.addEventListener('submit', function(e){
    e.preventDefault();
    
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';

    // Show for 2 seconds
    setTimeout(calculateResults, 2000);
});

function calculateResults() {
    // UI Variables
    const uiAmount = document.getElementById('amount');
    const uiInterest = document.getElementById('interest');
    const uiYears = document.getElementById('years');
    const uiMonthlyPayment = document.getElementById('monthly-payment');
    const uiTotalPayment = document.getElementById('total-payment');
    const uiTotalInterest = document.getElementById('total-interest');

    // Calculations
    const principal = parseFloat(uiAmount.value);
    const calculateInterest = parseFloat(uiInterest.value) / 100 / 12;
    const calculatePayments = parseFloat(uiYears.value) * 12;

    // Compute Monthly Payment
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal * x * calculateInterest) / (x-1);

    if(isFinite(monthly)) {
        uiMonthlyPayment.value = monthly.toFixed(2);
        uiTotalPayment.value = (monthly * calculatePayments).toFixed(2);
        uiTotalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);
        // Show results & Hide Loading
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        // Create Element For Error Alert
        showError('Please Check your numbers');
    }
}

function showError(error) {
    
    document.getElementById('loading').style.display = 'none';
    // Create a div
    const errorDiv = document.createElement('div');

    // Get Element before which to put error
    const card = document.querySelector('.card-header');
    const heading = document.querySelector('.display-4');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create text node [above error message] and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert the error errorDiv before heading in card
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}