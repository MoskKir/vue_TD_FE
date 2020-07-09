<template>
    <div class="calendar-days-container">
        <div class="row-days" v-for="(week, index) of calendarDaysArr" :key="index">
            <div :class="[day ? 'day' : 'emptyDay']" v-for="day of week" :key="day">
                <button 
                    @click="day ? dayPicker(day) : null"
                    :class="[isToday(day) ? 'today' : null]"
                >{{ day }}</button>                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CalendarDays',
    props: [
        'firstDay', 
        'selectedMonth', 
        'selectedYear'
    ],
    data: () => ({
        calendarDaysArr: [[], [], [], [], [], []],
    }),
    created: function() {
        this.getCalendarDaysArr();
    },
    watch: {
        firstDay: function() {
            this.calendarDaysArr = [[], [], [], [], [], []];
            this.getCalendarDaysArr(this.firstDay, this.selectedMonth, this.selectedYear);
        },
        selectedMonth: function() {
            this.calendarDaysArr = [[], [], [], [], [], []];
            this.getCalendarDaysArr(this.firstDay, this.selectedMonth, this.selectedYear);
        },
        selectedYear: function() {
            this.calendarDaysArr = [[], [], [], [], [], []];
            this.getCalendarDaysArr(this.firstDay, this.selectedMonth, this.selectedYear);
        }
    },
    methods: {
        getCalendarDaysArr(delta = false, monthProps, yearProps) {

            const getDaysInMonth = (month, year) => (new Array(31))
                    .fill('')
                    .map( (v,i) => new Date(year, month - 1, i + 1))
                    .filter(v => v.getMonth() === month - 1 );

            const arrDate = getDaysInMonth(monthProps, yearProps);

            arrDate.forEach(day => {
                let weekN = (delta) ? (day.getDay() - 1 < 0) ? 6 : day.getDay() - 1 : day.getDay();

                let weekMN = Math.ceil((day.getDate() - 1 - weekN) / 7);
                
                this.calendarDaysArr[weekMN][weekN] = day.getDate();
            });
        },
        isToday(day) {
            const today = new Date()
            return (
                today.getDate() === day &&
                today.getMonth() + 1 === this.selectedMonth &&
                today.getFullYear() === this.selectedYear
            ) ? true : false
        },
        dayPicker(selectDay) {
            console.log('this is the day picker', selectDay)
        }
    }

}
</script>

<style lang="css" scoped>
    :root {
        --day_width_var: 45;
    }

    .row-days {
        display: flex;
    }

    .day {
        width: calc(100% / 7);
        min-width: calc(var(--day_width_var) * 1px);
        border-radius: 50%;
    }

    .day:hover {
        background-color: #6156a07a;
    }

    .emptyDay {
        width: calc(100% / 7);
        background-color: none;
        cursor: default;
    }

    .emptyDay button {
        cursor: default;
    }

    button {
        max-height: calc(var(--day_width_var) * 1px);
        padding: 10px;
        width: 100%;
        border: none;
        border-radius: 50%;
        outline: 0;
    }

    .today {
        box-shadow: 0 0 0 1px rgba(35, 5, 143, 0.678);
    }

</style>