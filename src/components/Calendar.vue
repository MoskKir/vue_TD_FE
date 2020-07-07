<template>
  <div class="jzdbox1 jzdbasf jzdcal">

    <input type="time" id="appt" name="appt"
       min="09:00" max="18:00" required>

    <div class="jzdcalt">
      <v-btn text @click="currentMonth--">prev</v-btn>

      <select
        v-model="currentMonthForSelect"
        @change="selectMonth($event)"
      >
        <option v-for="month in arrOfMonths" :key="month" @click="console.log(month)">{{ month }}</option>
      </select>

      <select v-model="currentYear" @change="selectYear($event)">
        <option
          v-for="year in arrOfYears"
          :key="year"
        >{{ year }}</option>
      </select>

      <v-btn text>next</v-btn>
    </div>

    <span>Su</span>
    <span>Mo</span>
    <span>Tu</span>
    <span>We</span>
    <span>Th</span>
    <span>Fr</span>
    <span>Sa</span>

    <span v-bind="arrOfDays" v-for="day in arrOfDays" :key="day.dayNum" @click="console.log(day)">
      <span v-if="day.dayNum" @click="clickOnDate(day.dayNum)" >{{ day.dayNum }}</span>
      <span v-else class="jzdb"></span>
    </span>

  </div>
</template>

<script>
export default {
  name: "Calendar",
  data: () => ({
    currentDay: new Date().getDate(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    arrOfDays: [],
    arrOfMonths: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь"
    ],
    arrOfYears: [],
    currentMonthForSelect: 'мартобря',
    selectedDate: null
  }),
  created: function() {
    this.getArrOfDays();
    console.log(this.arrOfDays);
    let year = 1995;
    this.arrOfYears = Array(40).fill().map(() => year++);
    this.currentMonthForSelect = this.arrOfMonths[this.currentMonth];
    console.log(this.currentMonth)
  },
  methods: {
    getArrOfDays() {
      this.arrOfDays = [];
      let date = new Date(this.currentYear, this.currentMonth, 1);
      let tempArr = [];

      while (date.getMonth() === this.currentMonth) {
        let day = {
          dayNum: new Date(date).getDate(),
          dayOfWeek: new Date(date).getDay()
        };
        tempArr.push(day);
        date.setDate(date.getDate() + 1);
      }

      for (let i = 0; i <= 6; i++) {
        this.arrOfDays.push({ dayNum: null, dayOfWeek: i });
        if (i === tempArr[0].dayOfWeek) {
          this.arrOfDays[i] = tempArr;
          this.arrOfDays = this.arrOfDays.flat();
          if (this.arrOfDays.length < 42)
            this.arrOfDays = this.arrOfDays.concat(
              new Array(42 - this.arrOfDays.length).fill({
                dayNum: null,
                dayOfWeek: null
              })
            );

          break;
        }
      }
    },
    selectMonth(event) {
      this.currentMonth = this.arrOfMonths.indexOf(event.target.value);
      this.getArrOfDays();
    },
    selectYear(event) {
      this.currentYear = event.target.value;
      this.getArrOfDays();
    },
    clickOnDate(selectedDay) {
        this.selectedDate = (selectedDay, this.currentMonth + 1, +this.currentYear).toString()
    }
  }
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Fjalla+One:400|Roboto:400,400italic,700);

.jzdbox1 {
  width: 315px;
  background: #332f2e;
  border-radius: 5px;
  overflow: hidden;
  display: block;
  margin-bottom: 10px;
  box-shadow: 0 0 10px #201d1c;
  margin: 0 auto;
  margin-top: 100px;
}

.jzdcal {
  padding: 0 10px 10px 10px;
  box-sizing: border-box !important;
  background: #749d9e;
  background: -webkit-linear-gradient(#749d9e, #b3a68b) !important;
  background: -o-linear-gradient(#749d9e, #b3a68b) !important;
  background: -moz-linear-gradient(#749d9e, #b3a68b) !important;
  background: linear-gradient(#749d9e, #b3a68b) !important;
}

.jzdcalt {
  font: 18px "Roboto";
  font-weight: 700;
  color: #f7f3eb;
  display: block;
  margin: 18px 0 0 0;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
}

select {
  color: #f7f3eb;
  background-color: #749d9e;
  text-transform: uppercase;
  cursor: pointer;
}

.jzdcal span {
  font: 11px "Roboto";
  font-weight: 400;
  color: #f7f3eb;
  text-align: center;
  width: 42px;
  height: 42px;
  display: inline-block;
  overflow: hidden;
  line-height: 40px;
  cursor: pointer;
}

.jzdcal .jzdb:before {
  opacity: 0.3;
  content: "o";
}

.circle {
  border: 1px solid #f7f3eb;
  box-sizing: border-box !important;
  border-radius: 200px !important;
}

span[data-title]:hover:after,
div[data-title]:hover:after {
  font: 11px "Roboto";
  font-weight: 400;
  content: attr(data-title);
  position: absolute;
  margin: 0 0 100px;
  background: #282423;
  border: 1px solid #f7f3eb;
  color: #f7f3eb;
  padding: 5px;
  z-index: 9999;
  min-width: 150px;
  max-width: 150px;
}
</style>