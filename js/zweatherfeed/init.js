// Lucas Fajger
// 1.0 Zweatherfeed plugin

(function ($){
    "use strict";
    $(document).ready(function(){
        if($(".ct-js-weather").length > 0){
            $(".ct-js-weather").each(function(){
                var $this = $(this);

                var ctforecast = parseBoolean($this.attr("data-forecast"), false); //If true, includes the forecast for the next 24hrs (including the current & next day).
                var ctdegrees = validatedata($this.attr("data-degree"), 'c'); //Specifies the units to return: 'c' - celsius, 'f' - fahrenheit
                var ctimage = parseBoolean($this.attr("data-image"), true); //If true, displays an image of the weather condition in the background.
                var ctcountry = parseBoolean($this.attr("data-country"), false); //If true, shows the locations country name.
                var cthighlow = parseBoolean($this.attr("data-highlow"), true); //If true, includes the high and low temperature values.
                var ctwind = parseBoolean($this.attr("data-wind"), true); //If true, includes the wind direction and strength.
                var cthumidity = parseBoolean($this.attr("data-humidity"), false); //If true, includes the current humidity value.
                var ctvisibility = parseBoolean($this.attr("data-visibility"), false); //If true, includes a measure of the current visibility.
                var ctsunrise= parseBoolean($this.attr("data-sunrise"), false); //If true, includes the time of sunrise.
                var ctsunset = parseBoolean($this.attr("data-sunset"), false); //If true, includes the time of sunset.
                var ctlink = parseBoolean($this.attr("data-link"), false); //If true, includes the link to full forecast on the Yahoo! website.
                var ctlinktarget = validatedata($this.attr("data-linktarget"), '_self'); //Specifies the target for forecast links ('_blank', '_self', '_top', framename).
                var ctshowerror = parseBoolean($this.attr("data-showerror"), true); //If true, displays a message if the feed is unavailable or the location is invalid.
                var ctwoeid = parseBoolean($this.attr("data-woeid"), false); //If true, uses Yahoo! WOEID indentifiers for locations (see location example - http://www.zazar.net/developers/jquery/zweatherfeed/example_location.html ).
                var ctrefresh = parseInt(validatedata($this.attr("data-refresh"), 0), 10);

                var ctlocation =  validatedata($this.attr("data-location"), 'PLXX0028'); // ID LOCATION WEATHER SITE: http://uk.weather.com

                //IMPORTANT!!
                // /$('#test').weatherfeed(['UKXX0085','EGXX0011','UKXX0061','CAXX0518','CHXX0049']); <--- Plugin has to be improve so that can get more locations than one like it is in example


                $this.weatherfeed([ctlocation],{
                    forecast: ctforecast,
                    unit: ctdegrees,
                    image: ctimage,
                    country: ctcountry,
                    highlow: cthighlow,
                    wind: ctwind,
                    humidity: cthumidity,
                    visibility: ctvisibility,
                    sunrise: ctsunrise,
                    sunset: ctsunset,
                    link: ctlink,
                    linktarget: ctlinktarget,
                    showerror: ctshowerror,
                    woeid: ctwoeid,
                    refresh: ctrefresh
                });
            });
        }
    });
}(jQuery));
