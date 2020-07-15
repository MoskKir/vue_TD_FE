<template>
    <div class="box box-text bgTable">
        
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
                    :pickedDayEmit ="pickedDay = $event"
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
    name:'Calendarec',
    props: [
        'isMonday'
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
        pickedDay: null,
        selectedMonth: null,
        selectedYear: null
    }),
    watch: {
        isMonday: function() {
            if (this.weekDays[0] !== 'Mon') this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            else this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']          
        }
    },
    methods: {
        pickedDayIsPicked() {
            this.$emit('pickedDayIsPicked', this.pickedDay)
        }
    }
}
</script>

<style lang="scss">
    .bgTable {
        box-sizing: border-box !important;
        background: #ffffff;
    }

    .box {
        border-radius: 5px;
        overflow: hidden;
        display: block;
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
        padding: 12px;
    }

    .date-navigation-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .week-days {
        display: flex;
    }

    .day-label {
        width: calc(100% / 7);
        font-size: 10px;

    }

    .is-monday-check {
        font-size: 12px;
        text-transform: none;
    }

</style>