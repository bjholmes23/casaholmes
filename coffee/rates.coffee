module.exports =
  greenSeason:
    name: "greenSeason"
    description: "Green Season"
    startDate: new Date("1-May")
    endDate: new Date("13-Nov")
    nightRate: 500
    weekendNightRate: 500
    weekRate: 3350
    extraPersonFee: 38
    minStay: 2
  highSeason:
    name: "highSeason"
    description: "High Season"
    startDate: new Date("14-Nov")
    endDate: new Date("30-Apr")
    nightRate: 590
    weekendNightRate: 625
    weekRate: 3900
    extraPersonFee: 38
    minStay: 2
  christmas:
    name: "christmasSeason"
    description: "Christmas Season"
    startDate: new Date("19-Dec")
    endDate: new Date("30-Dec")
    nightRate: undefined # no night rates for christmas
    weekendNightRate: undefined # no night rates for christmas
    weekRate: 6750
    extraPersonFee: 38
    minStay: 7