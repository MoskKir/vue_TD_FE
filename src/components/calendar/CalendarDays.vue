<template>
    <div class="calendar-days-container">
        <div class="row-days" v-for="(week, index) of calendarDaysArr" :key="index">
            <div :class="[day ? 'day' : 'emptyDay']" v-for="day of week" :key="day">
                <button 
                    @click="day ? dayPicker(day) : null"
                    :class="[isToday(day) ? 'today' : null]"
                    ref="index"
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
        pickedDay: new Date,
        // pickedDayArr: (localStorage.pickedDayArr) ? JSON.parse(localStorage.pickedDayArr) : [],
    }),
    created() {
        this.getCalendarDaysArr();
    },
    watch: {
        firstDay() {
            this.updateUI()
        },
        selectedMonth() {
            this.updateUI()
        },
        selectedYear() {
            this.updateUI()
        },
        // pickedDayArr() {
        //     this.$emit('pickedDayArrEmit', this.pickedDayArr);
        // },
        pickedDay() {
            this.$emit('pickedDayEmit', this.pickedDay);
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
        updateUI() {
            this.calendarDaysArr = [[], [], [], [], [], []];
            this.getCalendarDaysArr(this.firstDay, this.selectedMonth, this.selectedYear);
            this.dayPicker(this.firstDay);
        },
        dayPicker(selectDay) {            
            const pickedDay = {
                day: selectDay,
                month: this.selectedMonth,
                year: this.selectedYear
            }

            const dateObj = new Date(pickedDay.year, pickedDay.month - 1, pickedDay.day);

            this.pickedDay = dateObj

            /*
            ------------    multi date select 'unnecessary feature'    ------------          
            
            
            let tempArr = JSON.parse(JSON.stringify(this.pickedDayArr))
            
            let newItem 

            if (tempArr.length) {
                for (let i = 0; i < tempArr.length; i++) {
                    if (JSON.stringify(tempArr[i]) === JSON.stringify(pickedDay)) {
                        newItem = null
                        tempArr.splice(i, 1);
                        break;
                    } else {
                        newItem = pickedDay;
                    }
                }
            } else {
                newItem = pickedDay;
            }
            tempArr.push(newItem)
            tempArr = tempArr.filter(day => day !== null)
            this.pickedDayArr = tempArr
            localStorage.pickedDayArr = this.pickedDayArr

            */
        }
    }

}
</script>

<style lang="css" scoped>
    :root {
        --day_width_var: 45;
    }

    .calendar-days-container {
        display: grid;
    }

    .row-days {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        font-size: 10px;
    }

    .day {
        margin: 0 auto;
        width: 100%;
        border-radius: 50%;
    }

    .celebration {
        color: #ff0000;
    }

    .day:hover {
        background-color: #1976d26e;
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
        width: fit-content;
        display: inline-block;
        text-align: center;
        max-height: calc(var(--day_width_var) * 1px);
        padding: 10px;
        border: none;
        border-radius: 50%;
        outline: 0;
    }

    .today {
        box-shadow: 0 0 0 1px #1976d2;
    }

</style>