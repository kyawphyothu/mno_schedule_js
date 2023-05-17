import { publicHoliday } from "./publicHoliday/publicHoliday.js";
import { isCookieSet, getCookie } from "./checkCookies.js";

const eventDates = []; // Define an array to store the event dates
const DatesByGroups = [0, '2023-05-08', '2023-05-10', '2023-05-12', '2023-05-14']; //startup dates for different groups
let startDate;

//change the cookie if user change radio check-----------------------------------------------------------
const radioInputs = document.querySelectorAll('input[type="radio"]');   // Get all the radio inputs

// Add event listener for the change event
radioInputs.forEach(function(input) {
    input.addEventListener('change', function() {
        // Check if the radio input is checked
        if (this.checked) {
            document.cookie = `group=${this.value}; path=/`;
            location.reload();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    //working with cookies-------------------------------------------------------------------------------------------
    // document.cookie = "myCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if( isCookieSet('group') ){
        let cookie = getCookie('group');

        // Define the start date of the event
        startDate = new Date(DatesByGroups[cookie]);

        //make html default radio check
        document.querySelector(`input[value="${cookie}"]`).checked = true;
    } else {
        // Define the start date of the event
        startDate = new Date(DatesByGroups[1]);

        //make html default radio check
        document.querySelector(`input[value="1"]`).checked = true;
    }

	// Define the duration of each segment in milliseconds
	const dayShiftDuration = 2 * 24 * 60 * 60 * 1000; // 2 days
	const restDuration = 2 * 24 * 60 * 60 * 1000; // 2 days
	const nightShiftDuration = 2 * 24 * 60 * 60 * 1000; // 2 days

	const separateDay = 1 * 24 * 60 * 60 * 1000; // 1 days

	// Define the total duration of the event in milliseconds
	const totalDuration = 8 * 24 * 60 * 60 * 1000;

	// Define the number of cycles you want to loop through
	const numCycles = 100;

	// Define an array of colors to assign to each segment
	const colors = ['green', 'black', 'blue'];

	// Loop through the desired number of cycles
	for (let i = 0; i < numCycles; i++) {
        // Calculate the start and end dates of each segment based on the current cycle
        const dayShiftStart = new Date(startDate.getTime() + i * totalDuration);
        const dayShiftEnd = new Date(dayShiftStart.getTime() + dayShiftDuration);
        const dayRestStart = new Date(dayShiftEnd.getTime() );
        const dayRestEnd = new Date(dayRestStart.getTime() + restDuration);
        const nightShiftStart = new Date(dayRestEnd.getTime() );
        const nightShiftEnd = new Date(nightShiftStart.getTime() + nightShiftDuration);
        const nightRestStart = new Date(nightShiftEnd.getTime() );
        const nightRestEnd = new Date(nightRestStart.getTime() + restDuration);

        // Add the segment dates to the eventDates array
        eventDates.push({
            title: 'DayShift',
            start: dayShiftStart.toISOString().split('T')[0],
            end: dayShiftEnd.toISOString().split('T')[0],
            color: colors[0],
        });
        eventDates.push({
            title: 'OFF',
            start: dayRestStart.toISOString().split('T')[0],
            end: dayRestEnd.toISOString().split('T')[0],
            color: colors[1],
        });
        eventDates.push({
            title: 'NightShift',
            start: nightShiftStart.toISOString().split('T')[0],
            end: nightShiftEnd.toISOString().split('T')[0],
            color: colors[2],
        });
        eventDates.push({
            title: 'OFF',
            start: nightRestStart.toISOString().split('T')[0],
            end: nightRestEnd.toISOString().split('T')[0],
            color: colors[1],
        });
	}
})

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek'
        },
        initialView: 'dayGridMonth',
        // initialDate: '2023-01-12',
        initialDate: new Date(),
        // editable: true,
        selectable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        // multiMonthMaxColumns: 1, // guarantee single column
        // showNonCurrentDates: true,
        // fixedWeekCount: false,
        // businessHours: true,
        // weekends: false,
        responsive: true,
        themeSystem: 'bootstrap5',
        events:
        [
            ...eventDates,
            ...publicHoliday,
        ]
    });

    calendar.render();
});
