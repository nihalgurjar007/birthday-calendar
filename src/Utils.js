let Utils = (function () {

  function getInitials(text) {
    return text.split(' ').map(item => item.charAt(0).toUpperCase()).join('');
  }

  function getDayFromDate(date) {
    var d = new Date(date);
    var options = { weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(d).toLowerCase();
  }

  function getYearFromDate(date) {
    var d = new Date(date);
    return d.getFullYear();
  }

  return {
    getInitials,
    getDayFromDate,
    getYearFromDate
  }
}) ();