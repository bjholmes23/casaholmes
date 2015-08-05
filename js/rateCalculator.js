(function() {
  var DAY, PEOPLE_LIMIT, RateCalculator, _;

  _ = require('underscore');

  PEOPLE_LIMIT = 4;

  DAY = 1000 * 60 * 60 * 24;

  RateCalculator = (function() {
    function RateCalculator(rates) {
      this.rates = rates;
    }

    RateCalculator.prototype.calcRates = function(checkInDate, checkOutDate, num_of_people) {
      var booking_days, dailyRate, extraPeople, matchedSeasons, matchingSeason, seasons, weekDays, weekendDays;
      matchedSeasons = [];
      seasons = [];
      console.log("checkinDate: ", checkInDate);
      console.log("checkOutDate: ", checkOutDate);
      matchedSeasons = _.filter(this.rates, (function(_this) {
        return function(s) {
          return _this.inSeason(checkInDate, checkOutDate, s.startDate, s.endDate);
        };
      })(this));
      console.log(matchedSeasons);
      matchingSeason = _.max(matchedSeasons, function(s) {
        return s.weekRate;
      });
      matchingSeason.errorMessage = "";
      console.log("Season: ", matchingSeason.description);
      console.log("Nightly rate: ", matchingSeason.nightRate);
      console.log("Weekend night rate: ", matchingSeason.weekendNightRate);
      console.log("Weekly Rate: ", matchingSeason.weekRate);
      console.log("Minimum Stay: ", matchingSeason.minStay);
      booking_days = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / DAY);
      if (booking_days < matchingSeason.minStay) {
        matchingSeason.errorMessage += "The minimum stay during the " + matchingSeason.description + " is " + matchingSeason.minStay;
      }
      weekDays = this.weekDaysBetweenDates(checkInDate, checkOutDate);
      weekendDays = booking_days - weekDays;
      if (booking_days < 7) {
        dailyRate = ((weekDays * matchingSeason.nightRate) + (weekendDays * matchingSeason.weekendNightRate)) / booking_days;
      } else {
        dailyRate = matchingSeason.weekRate / 7;
      }
      extraPeople = 0;
      if ((num_of_people - PEOPLE_LIMIT) > 0) {
        extraPeople = num_of_people - PEOPLE_LIMIT;
      }
      dailyRate = dailyRate + (matchingSeason.extraPersonFee * extraPeople);
      console.log('Weekdays: ', weekDays);
      console.log('Weekend days:', weekendDays);
      console.log('Daily Rate:', dailyRate);
      matchingSeason.weekDays = weekDays;
      matchingSeason.weekendDays = weekendDays;
      matchingSeason.booking_days = booking_days;
      matchingSeason.dailyRate = dailyRate;
      matchingSeason.totalPrice = dailyRate * booking_days;
      return matchingSeason;
    };

    RateCalculator.prototype.inSeason = function(checkInDate, checkOutDate, startDate, endDate) {
      console.log(checkInDate, checkOutDate, startDate, endDate);
      startDate.setYear(checkInDate.getFullYear());
      endDate.setYear(checkInDate.getFullYear());
      if (startDate > endDate) {
        endDate.setYear(startDate.getFullYear() + 1);
      }
      console.log("startDate: ", startDate);
      console.log("endDate: ", endDate);
      return (checkInDate >= startDate && checkInDate <= endDate) || (checkOutDate >= startDate && checkOutDate <= endDate);
    };

    RateCalculator.prototype.weekDaysBetweenDates = function(startDate, endDate) {
      var d1, d2, day, daycount, flag;
      if (endDate < startDate) {
        return 0;
      }
      d1 = new Date(startDate);
      d2 = new Date(endDate);
      flag = true;
      daycount = 0;
      while (flag) {
        day = d1.getDay();
        if (day !== 5 && day !== 6) {
          daycount++;
        }
        d1.setDate(d1.getDate() + 1);
        if (d1.getDate() === d2.getDate()) {
          flag = false;
        }
      }
      return daycount;
    };

    return RateCalculator;

  })();

  module.exports = RateCalculator;

}).call(this);
