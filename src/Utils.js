let Utils = (function () {

  function getInitials(text) {
    return text.split(' ').map(item => item.charAt(0).toUpperCase()).join('');
  }

  function getDayFromDate(date) {
    var d = new Date(date);
    var options = { weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(d).toLowerCase();
  }

  function getBirthDayFromDate(date, selectedYear) {
    let d = new Date(date);
    let month = d.getMonth();
    let day = d.getDate();
    let c = new Date(selectedYear, month, day);
    return getDayFromDate(c)
  }

  return {
    getInitials,
    getDayFromDate,
    getBirthDayFromDate
  }
}) ();