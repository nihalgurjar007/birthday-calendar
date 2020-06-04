
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

    document.getElementById("calendar-view").innerHTML = weekCards;

    document.getElementById("update-btn").addEventListener("click", function () {
      let value = document.getElementById("text-area").value
      let selectedYear = document.getElementById("year-value").value
      if (!value || !selectedYear) {
        alert("Json and Year are required fields");
        return;
      }
      let jsonData = {}
      try {
        jsonData = JSON.parse(value)
      }
      catch (err) {
        alert("Please enter valid json");
        return;
      };
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
    Object.keys(weekList).forEach((item) => weekList[item] = [])
    for (let i = 0; i < data.length; i++){
      let day = Utils.getDayFromDate(data[i].birthday);
      if (Utils.getYearFromDate(data[i].birthday) === parseInt(selectedYear)) {
        if (!weekList[day]) {
          weekList[day] = [];
        }
        weekList[day].push(data[i]);
      }
    }
    Object.keys(weekList).forEach((key) => {
      renderBirthdays(weekList[key], key);
    })
  }

  function renderBirthdays(data, id) {
    let birthdayList;
    if (data.length > 0) {
      birthdayList = data.map((item, index) => {
        return (`
          <div class="card-item" style="background:${getBgFromIndex(index)}">
            ${Utils.getInitials(item.name)}
          </div>
        `);
      }).join('');
    }
    else {
      birthdayList = `<div class="card-item" style="background:lightgray">No Birthdays</div>`
    }
    document.getElementById(`card-area-${id}`).innerHTML = birthdayList;
  }

  init();
})();


