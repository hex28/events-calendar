export function getDaysInMonth(month, year) {
  var names = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
  var date = new Date(year, month - 1, 1);
  var result = [];
  let currWeek = {}
  let week = []
  let count = 1;
  while (date.getMonth() == month - 1) {
    currWeek[names[date.getDay()]] = count++
    if (date.getDay() === 6){
      week.push(currWeek)
      currWeek = {}
    }
    result.push(date.getDate() + "_" + names[date.getDay()]);
    date.setDate(date.getDate() + 1);
  }

  return week;
}


export function convertTime(time) {
  const splitTime = time.split(':')
  let hour = splitTime[0] - 0
  let minutes = splitTime[1] - 0
  let am_pm = ''
  if (hour > 12) {
    hour = hour - 12
    am_pm = 'PM'
  } else {
    am_pm = 'AM'
  }
  return `${hour}:${minutes > 10 ? minutes : '0' + minutes} ${am_pm}`;
}

export function truncateString(str) {
  if (str.length > 20){
    return str.split('').slice(0, 20).join('') + '...'
  }
  return str
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.split('').slice(1).join('')
}
