// Define an array to store the event dates
const eventDates = [];

document.addEventListener('DOMContentLoaded', function() {
	// Define the start date of the event
	const startDate = new Date('2023-05-08');

	// Define the duration of each segment in milliseconds
	const dayShiftDuration = 1 * 24 * 60 * 60 * 1000; // 2 days
	const restDuration = 1 * 24 * 60 * 60 * 1000; // 2 days
	const nightShiftDuration = 1 * 24 * 60 * 60 * 1000; // 2 days

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
	  const dayRestStart = new Date(dayShiftEnd.getTime() + separateDay);
	  const dayRestEnd = new Date(dayRestStart.getTime() + restDuration);
	  const nightShiftStart = new Date(dayRestEnd.getTime() + separateDay);
	  const nightShiftEnd = new Date(nightShiftStart.getTime() + nightShiftDuration);
	  const nightRestStart = new Date(nightShiftEnd.getTime() + separateDay);
	  const nightRestEnd = new Date(nightRestStart.getTime() + restDuration);

	  // Add the segment dates to the eventDates array
	  eventDates.push({
		title: 'dayShift',
		start: dayShiftStart,
		end: dayShiftEnd,
		color: colors[0],
	  });
	  eventDates.push({
		title: 'dRest',
		start: dayRestStart,
		end: dayRestEnd,
		color: colors[1],
	  });
	  eventDates.push({
		title: 'nightShift',
		start: nightShiftStart,
		end: nightShiftEnd,
		color: colors[2],
	  });
	  eventDates.push({
		title: 'nRest',
		start: nightRestStart,
		end: nightRestEnd,
		color: colors[1],
	  });

	//   console.log(i * totalDuration)
	}
	console.log(eventDates);
})

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'multiMonthYear,dayGridMonth,timeGridWeek'
      },
      initialView: 'multiMonthYear',
      initialDate: '2023-01-12',
      editable: true,
      selectable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      // multiMonthMaxColumns: 1, // guarantee single column
      // showNonCurrentDates: true,
      // fixedWeekCount: false,
      // businessHours: true,
    //   weekends: false,
      events: eventDates
	//   [
        // {
        //   title: 'All Day Event',
        //   start: '2023-01-01'
        // },
        // {
        //   title: 'Long Event',
        //   start: '2023-01-07',
        //   end: '2023-01-10'
        // },
        // {
        //   groupId: 999,
        //   title: 'Repeating Event',
        //   start: '2023-01-09T16:00:00'
        // },
        // {
        //   groupId: 999,
        //   title: 'Repeating Event',
        //   start: '2023-01-16T16:00:00'
        // },
        // {
        //   title: 'Conference',
        //   start: '2023-01-11',
        //   end: '2023-01-13'
        // },
        // {
        //   title: 'Meeting',
        //   start: '2023-01-12T10:30:00',
        //   end: '2023-01-12T12:30:00'
        // },
        // {
        //   title: 'Lunch',
        //   start: '2023-01-12T12:00:00'
        // },
        // {
        //   title: 'Meeting',
        //   start: '2023-01-12T14:30:00'
        // },
        // {
        //   title: 'Happy Hour',
        //   start: '2023-01-12T17:30:00'
        // },
        // {
        //   title: 'Dinner',
        //   start: '2023-01-12T20:00:00'
        // },
        // {
        //   title: 'Birthday dayShift',
        //   start: '2023-01-13T07:00:00'
        // },
        // {
        //   title: 'Click for Google',
        //   url: 'http://google.com/',
        //   start: '2023-01-28'
        // }
    //   ]
    });

    calendar.render();
  });
