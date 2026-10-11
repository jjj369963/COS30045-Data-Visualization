// main.js - COS30045 Exercise 4.1
// Lim Jun Xian

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var answer = this.nextElementSibling;
        var isOpen = this.classList.contains('open');

        // close everything first
        document.querySelectorAll('.faq-question').forEach(function(q) {
            q.classList.remove('open');
            q.nextElementSibling.classList.remove('open');
        });

        // if it wasnt open, open it now
        if (!isOpen) {
            btn.classList.add('open');
            answer.classList.add('open');
        }
    });
});


// Energy calculator
var calcForm = document.getElementById('calc-form');

if (calcForm) {

    // wattage presets for the dropdown
    var presets = {
        custom: '',
        tv_lcd: '100',
        tv_oled: '120',
        fridge: '150',
        washing: '500',
        dishwasher: '1400',
        aircon: '1500',
        microwave: '1200',
        laptop: '45',
        desktop: '200'
    };

    var selectEl = document.getElementById('appliance-select');
    var wattsEl = document.getElementById('watts');

    selectEl.addEventListener('change', function() {
        var w = presets[this.value];
        if (w) {
            wattsEl.value = w;
            removeError('watts');
        } else {
            wattsEl.value = '';
        }
    });

    // reset button clears the form and hides results
    var resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            document.getElementById('calc-form').reset();
            removeError('watts');
            removeError('hours');
            removeError('price');
            document.getElementById('calc-results').classList.remove('visible');
        });
    }

    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (checkInputs()) {
            calculate();
        }
    });
}

function removeError(id) {
    var grp = document.getElementById(id).closest('.form-group');
    grp.classList.remove('invalid');
}

function showError(id, msg) {
    var grp = document.getElementById(id).closest('.form-group');
    grp.classList.add('invalid');
    grp.querySelector('.error-msg').textContent = msg;
}

function checkInputs() {
    var ok = true;

    var watts = parseFloat(document.getElementById('watts').value);
    var hours = parseFloat(document.getElementById('hours').value);
    var price = parseFloat(document.getElementById('price').value);

    removeError('watts');
    removeError('hours');
    removeError('price');

    if (isNaN(watts) || watts <= 0) {
        showError('watts', 'Please enter a wattage above 0.');
        ok = false;
    }

    if (isNaN(hours) || hours <= 0 || hours > 24) {
        showError('hours', 'Hours must be between 0.1 and 24.');
        ok = false;
    }

    if (isNaN(price) || price <= 0) {
        showError('price', 'Please enter a price above 0.');
        ok = false;
    }

    return ok;
}

function calculate() {
    var watts = parseFloat(document.getElementById('watts').value);
    var hours = parseFloat(document.getElementById('hours').value);
    var priceCents = parseFloat(document.getElementById('price').value);

    // convert cents to dollars
    var priceDollars = priceCents / 100;

    var dailyKwh = (watts * hours) / 1000;
    var monthlyKwh = dailyKwh * 30;
    var yearlyKwh = dailyKwh * 365;

    var dailyCost = dailyKwh * priceDollars;
    var monthlyCost = monthlyKwh * priceDollars;
    var yearlyCost = yearlyKwh * priceDollars;

    document.getElementById('res-daily-kwh').textContent = dailyKwh.toFixed(3);
    document.getElementById('res-monthly-kwh').textContent = monthlyKwh.toFixed(2);
    document.getElementById('res-yearly-kwh').textContent = yearlyKwh.toFixed(1);
    document.getElementById('res-daily-cost').textContent = '$' + dailyCost.toFixed(2);
    document.getElementById('res-monthly-cost').textContent = '$' + monthlyCost.toFixed(2);
    document.getElementById('res-yearly-cost').textContent = '$' + yearlyCost.toFixed(2);

    var resultsDiv = document.getElementById('calc-results');
    resultsDiv.classList.add('visible');
}
