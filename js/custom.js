(function() {
  var DAY, RateCalculator, calculator, fillForms, rates, setEndDateDefault, update;

  rates = require('./rates');

  RateCalculator = require('./rateCalculator');

  calculator = new RateCalculator(rates);

  DAY = 1000 * 60 * 60 * 24;

  fillForms = function() {
    $('[name=country]').val($('#select2-country-container').text());
    $('[name=additionalReq]').val($('#additionalReq').val());
    $('[name=guests]').val($('#select2-guests-container').text());
    return $('[name=calculation]').val($('#calculationResults').text());
  };

  update = function() {
    var d1, d2, dailyRate, days_passed, num_of_people;
    if ((typeof num_of_people !== "undefined" && num_of_people !== null ? num_of_people.length : void 0) || (typeof $('input[name=checkin]').datepicker("getDate") === 'undefined') || (typeof $('input[name=checkout]').datepicker("getDate") === 'undefined')) {
      return null;
    }
    d1 = new Date($('input[name=checkin]').datepicker("getDate"));
    d2 = new Date($('input[name=checkout]').datepicker("getDate"));
    num_of_people = $('#guests').val();
    rates = calculator.calcRates(d1, d2, num_of_people);
    days_passed = rates.booking_days;
    if (days_passed === 0) {
      days_passed = 1;
    }
    if (days_passed < 0) {
      return setEndDateDefault(rates.minStay);
    }
    console.log("number of people: ", num_of_people);
    if (num_of_people != null ? num_of_people.length : void 0) {
      $('#display_guests').html(num_of_people + " @");
      dailyRate = rates.dailyRate;
      $('#day_rate').html(Math.round(rates.dailyRate));
      $('#total_price').html(Math.round(rates.booking_days * rates.dailyRate));
    }
    $('#rental_season').html(rates.description);
    $('#rental_days').html(Math.round(rates.booking_days));
    $('#week_days').html(Math.round(rates.weekDays));
    $('#weekend_days').html(Math.round(rates.weekendDays));
    if (rates.errorMessage) {
      $('#calculator_error').html(rates.errorMessage);
      return $('#calculator_message').addClass("fadeIn").removeClass("fade").css("display", "");
    } else {
      return $('#calculator_message').addClass("fade").removeClass("fadeIn").css("display", "none");
    }
  };

  setEndDateDefault = function(bufferDays) {
    var addDays;
    addDays = new Date($('input[name=checkin]').datepicker("getDate"));
    addDays.setDate(addDays.getDate() + bufferDays);
    $("input[name=checkout]").datepicker("setDate", addDays);
    return update();
  };

  jQuery(function() {
    $('input[name=checkin]').datepicker({
      startDate: 'today',
      firstDay: 1
    });
    $('input[name=checkout]').datepicker({
      startDate: '+2d',
      firstDay: 1
    });
    $(document).on('change', 'input[name=checkin]', function() {
      if ($('input[name=checkin]').val()) {
        $('input[name=checkin]').datepicker("hide");
        $('input[name=checkout]').datepicker("show");
        return update();
      }
    });
    $(document).on('change', 'input[name=checkout]', function() {
      if ($('input[name=checkin]').val()) {
        return update();
      }
    });
    $(document).on('change', '#guests', function() {
      return update();
    });
    $(document).on('click', '.maps', function() {
      return $('.maps iframe').css("pointer-events", "auto");
    });
    $(document).on('mouseleave', '.maps', function() {
      return $('.maps iframe').css("pointer-events", "none");
    });
    $(document).on('mouseenter', '.btn', function() {
      fillForms();
      return console.log('Filling Forms...');
    });
    return true;
  });

}).call(this);
