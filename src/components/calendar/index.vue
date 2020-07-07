<template>
    <div class="box box-text bgTable">
        <DatePickerHeader></DatePickerHeader>
        <p>This is new calendar whis decomposition</p>
        <div class="view">
            <div class="date-navigation-row">
                <MonthPicker></MonthPicker>
                <YearPicker></YearPicker>
            </div>
        </div>
    </div>
</template>

<script>
import DatePickerHeader from './DatePickerHeader';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';

export default {
    name:'Calendarec',
    components: {
        DatePickerHeader,
        MonthPicker,
        YearPicker
    }
}
</script>

<style lang="scss">
    .bgTable {
        box-sizing: border-box !important;
        background: #ffffff;
        background: linear-gradient(#00bbd438, #ffffff ) !important;
    }

    .box {
        width: 315px;
        background: #332f2e1a;
        border-radius: 5px;
        overflow: hidden;
        display: block;
        margin-bottom: 10px;
        // box-shadow: 0 0 10px #201d1c;
        margin: 0 auto;
        margin-top: 100px;
    }

    .box-text {
        font: 18px "Roboto";
        font-weight: 700;
        color: #000000;
        display: block;
        margin: 18px 0 0 0;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 1px;
    }

    .view {
        border: 1px solid red;
        padding: 16px;
    }

    .date-navigation-row {
        display: flex;
    }
</style>