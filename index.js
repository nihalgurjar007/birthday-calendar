(function () {

  let weekList = { 'mon': [], 'tue': [], 'wed': [], 'thu': [], 'fri': [], 'sat': [], 'sun': [] };
  
  function init() {
    let weekCards = Object.keys(weekList).map((item, index) => {
      return (`
        <div class="calendar-card">
          <div class="card-header">
            ${item.toUpperCase()}
          </div>
          <div class="card-area" id="card-area-${item}">
          </div>
        </div>
      `)
    }).join('');
    console.log(weekCards)
    document.getElementById("calendar-view").innerHTML = weekCards;

    document.getElementById("update-btn").addEventListener("click", function () {
      let value = document.getElementById("text-area").value
      let selectedYear = document.getElementById("year-value").value
      let jsonData = JSON.parse(value)
      showBirthdays(jsonData, selectedYear);
    })
  }

  function getBgFromIndex(index) {
    switch (index%10) {
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'yellow';
      case 4: return 'purple';
      case 5: return 'lightblue';
      case 6: return 'grey';
      case 7: return 'lightgray';
      case 8: return 'cyan';
      case 9: return 'red';
      case 0: return 'lightgreen';
    }
  }

  function showBirthdays(data, selectedYear) {
    console.log(data, parseInt(selectedYear))
    Object.keys(weekList).forEach((item) => weekList[item] = [])
    for (let i = 0; i < data.length; i++){
      let day = getDayFromDate(data[i].birthday);
      if (getYearFromDate(data[i].birthday) === parseInt(selectedYear)) {
        if (!weekList[day]) {
          weekList[day] = [];
        }
        weekList[day].push(data[i]);
      }
    }
    console.log(weekList)
    Object.keys(weekList).forEach((key) => {
      renderBirthdays(weekList[key], key);
    })
    
  }

  function renderBirthdays(data, id) {
    let birthdayList = data.map((item, index) => {
      return (`
        <div class="card-item" style="background:${getBgFromIndex(index)}">
          ${getInitials(item.name)}
        </div>
      `);
    }).join('');
    console.log(birthdayList)
    document.getElementById(`card-area-${id}`).innerHTML = birthdayList;
  }

  function getInitials(text) {
    return text.split(' ').map(item => item.charAt(0).toUpperCase()).join('');
  }

  function getDayFromDate(date) {
    var d = new Date(date);
    var options = { weekday: 'short'};
    return new Intl.DateTimeFormat('en-US', options).format(d).toLowerCase();
  }
  
  function getYearFromDate(date) {
    var d = new Date(date);
    console.log(d,d.getFullYear())
    return d.getFullYear();
  }
  init();
})();


