_ = require('underscore')

PEOPLE_LIMIT = 4
DAY = 1000 * 60 * 60 * 24

class RateCalculator
  constructor: (@rates) ->

  calcRates: (checkInDate, checkOutDate, num_of_people) ->
    matchedSeasons = []
    seasons = []

    # Adjusting the date range back a day because the checkout date doesn't actually count as a "night's stay"
    # checkOutDate.setDate(checkOutDate.getDate())

    console.log("checkinDate: ", checkInDate)
    console.log("checkOutDate: ", checkOutDate)

    matchedSeasons = _.filter @rates, (s) => @inSeason(checkInDate, checkOutDate, s.startDate, s.endDate)

    console.log(matchedSeasons)

    matchingSeason = _.max matchedSeasons, (s) -> s.weekRate

    matchingSeason.errorMessage = ""
    console.log("Season: ", matchingSeason.description)
    console.log("Nightly rate: ", matchingSeason.nightRate)
    console.log("Weekend night rate: ", matchingSeason.weekendNightRate)
    console.log("Weekly Rate: ", matchingSeason.weekRate)
    console.log("Minimum Stay: ", matchingSeason.minStay)

    booking_days = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / DAY)
    if booking_days < matchingSeason.minStay
      matchingSeason.errorMessage += "The minimum stay during the " + matchingSeason.description + " is " + matchingSeason.minStay

    weekDays = @weekDaysBetweenDates(checkInDate, checkOutDate)
    weekendDays = booking_days - weekDays

    if booking_days < 7
      dailyRate = ((weekDays * matchingSeason.nightRate) + (weekendDays * matchingSeason.weekendNightRate)) / booking_days
    else
      dailyRate = matchingSeason.weekRate / 7

    extraPeople = 0
    extraPeople = (num_of_people - PEOPLE_LIMIT) if (num_of_people - PEOPLE_LIMIT) > 0
    dailyRate = dailyRate + (matchingSeason.extraPersonFee * extraPeople)

    console.log('Weekdays: ', weekDays)
    console.log('Weekend days:', weekendDays)
    console.log('Daily Rate:', dailyRate)

    matchingSeason.weekDays = weekDays
    matchingSeason.weekendDays = weekendDays
    matchingSeason.booking_days = booking_days
    matchingSeason.dailyRate = dailyRate
    matchingSeason.totalPrice = dailyRate * booking_days

    matchingSeason

  inSeason: (checkInDate, checkOutDate, startDate, endDate) ->
    console.log(checkInDate, checkOutDate, startDate, endDate)
    startDate.setYear(checkInDate.getFullYear())
    endDate.setYear(checkInDate.getFullYear())
    endDate.setYear(startDate.getFullYear() + 1) if startDate > endDate
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