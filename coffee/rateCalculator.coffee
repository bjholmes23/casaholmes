_ = require('underscore')

PEOPLE_LIMIT = 4
DAY = 1000 * 60 * 60 * 24

class RateCalculator
  constructor: (@rates) ->

  calcRates: (checkInDate, checkOutDate, num_of_people) ->
    matchedSeasons = []

    # Adjusting the date range back a day because the checkout date doesn't actually count as a "night's stay"
    # checkOutDate.setDate(checkOutDate.getDate())

    console.log("checkinDate: ", checkInDate)
    console.log("checkOutDate: ", checkOutDate)

    for k,v of @rates
      if this.inSeason(checkInDate, checkOutDate, v.startDate, v.endDate)
          matchedSeasons[k] = v

    console.log(matchedSeasons)

    for k,v of matchedSeasons
      if (typeof matchedSeason == 'undefined') or (v.weekRate > matchedSeason.weekRate)
        matchedSeason = v

    if (typeof matchedSeason == 'undefined')
      matchedSeason = {}
      matchedSeason.errorMessage = "Please fill in the number of people and the dates for your reservation."
    else
        matchedSeason.errorMessage = ""
        console.log("Season: ", matchedSeason.description)
        console.log("Nightly rate: ", matchedSeason.nightRate)
        console.log("Weekend night rate: ", matchedSeason.weekendNightRate)
        console.log("Weekly Rate: ", matchedSeason.weekRate)
        console.log("Minimum Stay: ", matchedSeason.minStay)

        booking_days = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / DAY)
        if booking_days < matchedSeason.minStay
          matchedSeason.errorMessage += "The minimum stay during the " + matchedSeason.description + " is " + matchedSeason.minStay

        weekDays = @weekDaysBetweenDates(checkInDate, checkOutDate)
        weekendDays = booking_days - weekDays

        if booking_days < 7
          dailyRate = ((weekDays * matchedSeason.nightRate) + (weekendDays * matchedSeason.weekendNightRate)) / booking_days
        else
          dailyRate = matchedSeason.weekRate / 7

        extraPeople = 0
        extraPeople = (num_of_people - PEOPLE_LIMIT) if (num_of_people - PEOPLE_LIMIT) > 0
        dailyRate = dailyRate + (matchedSeason.extraPersonFee * extraPeople)

        console.log('Weekdays: ', weekDays)
        console.log('Weekend days:', weekendDays)
        console.log('Daily Rate:', dailyRate)

        matchedSeason.weekDays = weekDays
        matchedSeason.weekendDays = weekendDays
        matchedSeason.booking_days = booking_days
        matchedSeason.dailyRate = dailyRate
        matchedSeason.totalPrice = dailyRate * booking_days

    matchedSeason

  inSeason: (checkInDate, checkOutDate, startDate, endDate) ->
    console.log(checkInDate, checkOutDate, startDate, endDate)
    console.log("startDate: ", startDate)
    console.log("endDate: ", endDate)
    (checkInDate >= startDate && checkInDate <= endDate) or (checkOutDate >= startDate && checkOutDate <= endDate)

  weekDaysBetweenDates: (startDate, endDate) ->
    return 0 if (endDate < startDate)

    d1 = new Date(startDate)
    d2 = new Date(endDate)
    flag = true
    daycount = 0
    while flag
        day = d1.getDay()
        if day != 5 && day != 6
            daycount++
        d1.setDate(d1.getDate()+1)
        if d1.getDate() == d2.getDate()
            flag = false
    daycount

module.exports = RateCalculator