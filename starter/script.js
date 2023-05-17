// Generate the timeblocks
function generateTimeblocks() {
    var container = document.querySelector('.container');

    for (var hour = 9; hour <= 17; hour++) {
      var timeblock = createTimeblock(hour);
      container.appendChild(timeblock);
    }
  }

  // Create a single timeblock element
  function createTimeblock(hour) {
    var currentHour = moment().hour();
    var timeblockEl = document.createElement('div');
    timeblockEl.classList.add('row', 'time-block');

    // Create hour element
    var hourEl = document.createElement('div');
    hourEl.classList.add('col-1', 'hour');
    hourEl.textContent = formatHour(hour);
    timeblockEl.appendChild(hourEl);

    // Create text area element
    var textareaEl = document.createElement('textarea');
    textareaEl.classList.add('col-10', 'description', getHourColor(hour, currentHour));
    textareaEl.value = getEvent(hour);
    timeblockEl.appendChild(textareaEl);

    // Create save button element
    var saveBtnEl = document.createElement('button');
    saveBtnEl.classList.add('col-1', 'saveBtn');
    saveBtnEl.innerHTML = '<i class="fas fa-save"></i>';
    timeblockEl.appendChild(saveBtnEl);

    // Event listener for save button
    saveBtnEl.addEventListener('click', function () {
      var event = textareaEl.value;
      saveEvent(hour, event);
    });

    return timeblockEl;
  }

  // Format hour in AM/PM format
  function formatHour(hour) {
    var formattedHour = moment().hour(hour).format('hA');
    return formattedHour;
  }

  // Get the color for the timeblock based on past, present, or future
  function getHourColor(hour, currentHour) {
    if (hour < currentHour) {
      return 'past';
    } else if (hour === currentHour) {
      return 'present';
    } else {
      return 'future';
    }
  }

  // Get the saved event from local storage
  function getEvent(hour) {
    var event = localStorage.getItem('event_' + hour);
    return event || '';
  }

  // Save the event to local storage
  function saveEvent(hour, event) {
    localStorage.setItem('event_' + hour, event);
  }

  // Display the current day at the top of the calendar
  function displayCurrentDay() {
    var currentDayEl = document.getElementById('currentDay');
    currentDayEl.textContent = moment().format('dddd, MMMM Do');
  }

  // Initialize the scheduler
  function initScheduler() {
    generateTimeblocks();
    displayCurrentDay();
  }

  // Run the scheduler
  initScheduler();