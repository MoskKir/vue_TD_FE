<template>
    <div class="box box-text">
        
        <div class="view">
            <div class="date-navigation-row">

                <MonthPicker @monthNumberEmit="selectedMonth = $event"></MonthPicker>
                <YearPicker @emitSelectedYear="selectedYear = $event"></YearPicker>

            </div>
            <div class="week-days">

                <div class="day-label" v-for="weekDay in weekDays" :key="weekDay">{{ weekDay }}</div>

            </div>
            <div class="calendar-days-container">
                
                <CalendarDays 
                    :firstDay = isMonday 
                    :selectedMonth = selectedMonth
                    :selectedYear = selectedYear
                    @pickedDayEmit ="pickedDayIsPicked"
                ></CalendarDays>
                
            </div>
        </div>
    </div>
</template>

<script>
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';
import CalendarDays from './CalendarDays';

export default {
    name:'DatePicker',
    props: [
        'isMonday',
    ],
    components: {
        MonthPicker,
        YearPicker,
        CalendarDays,
    },
    model: {
        prop: 'pickedDay',
        event: 'pickedDayIsPicked'
    },
    data: () => ({
        weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        pickedDay: new Date,
        selectedMonth: null,
        selectedYear: null
    }),
    created() {
        console.log(this.pickedDay)

    },
    watch: {
        isMonday() {
            if (this.weekDays[0] !== 'Mon') this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            else this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']          
        },
        pickedDay() {
            console.log(this.pickedDay)     
        },
    },
    methods: {
        pickedDayIsPicked(data) {
            console.log(data)
            this.$emit('pickedDayIsPicked', data)
        }
    }
}
</script>

<style lang="scss" scope>

    .calendar-days-container {
        width: 100%;
    }

    .box {
        border-radius: 5px;
        margin-bottom: 10px;
        height: fit-content;
        margin: 0 auto;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 
                    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
                    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }

    .box-text {
        font: 15px "Roboto";
        font-weight: 700;
        color: #000000;
        display: block;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 1px;
    }

    .view {
        display: grid;
        padding: 12px;
    }

    .date-navigation-row {
        width: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .week-days {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        width: auto;
    }

    .day-label {
        margin: 0 auto;
        font-size: 12px;
    }

    .is-monday-check {
        font-size: 12px;
        text-transform: none;
    }

</style>