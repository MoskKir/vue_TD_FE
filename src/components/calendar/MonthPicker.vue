<template>
    <div class="month-picker-items">
        <div>
            <button @click="(monthNumber <= 1) ? monthNumber = 12 : --monthNumber ">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" 
                    fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
                </svg>
            </button>
        </div>
        <div>
            <button class="picker-btn">
                {{ monthLabelArr[monthNumber - 1] }}
            </button>
        </div>
        <div>
            <button @click="(monthNumber > 11) ? monthNumber = 1 : ++monthNumber ">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" 
                    fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MonthPicker',
    data: () => ({
        monthNumber: null,
        monthLabelArr: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
    }),
    created: function () {
        const date = new Date();
        this.monthNumber = date.getMonth() + 1;
    },
    watch: {
        monthNumber: function() {
            this.$emit('monthNumberEmit', this.monthNumber)
        }
    }
}
</script>

<style lang="scss" scoped>
    .month-picker-items {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 50%;
        font-size: 12px;
    }

    svg {
        transform: scale(0.4);
    }

    button {
        outline: 0;
        border-radius: 50%;
        width: 27px;
        height: 27px;
    }

    .picker-btn:hover {
        background-color: #ffffff00;
    }

    button:hover {
        background-color: #6156a07a;
    }

</style>