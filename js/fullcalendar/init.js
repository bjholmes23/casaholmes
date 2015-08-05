$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        events: [
            {
                title: 'All Day Event',
                start: '2015-04-01'
            },
            {
                title: 'Long Event',
                start: '2015-04-07',
                end: '2015-04-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2015-04-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2015-04-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2015-04-11',
                end: '2015-04-13'
            },
            {
                title: 'Meeting',
                start: '2015-04-12T10:30:00',
                end: '2015-04-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2015-04-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2015-04-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2015-04-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2015-04-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2015-04-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2015-04-28'
            },
            {
                title: 'Long Event',
                start: '2015-05-07',
                end: '2015-05-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2015-05-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2015-05-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2015-05-11',
                end: '2015-05-13'
            },
            {
                title: 'Meeting',
                start: '2015-05-12T10:30:00',
                end: '2015-05-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2015-05-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2015-05-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2015-05-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2015-05-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2015-05-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2015-05-28'
            }
        ]
    });

});