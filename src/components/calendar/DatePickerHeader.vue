<template>
    <div class="header">
        <div>
            <button @click="selectedYear = --currentYear">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" 
                    fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
                </svg>
            </button>
        </div>
        <div 
            class="title"
        >
            {{ currentDate.toDateString() }}
        </div>
        <div>
            <button @click="selectedYear = ++currentYear">
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
    name: 'DataPickerHeader',
    data: () => ({
        currentDate: null,
        currentYear: null,
        currentDay: null,

    }),
    created: function() {
        this.currentDate = new Date;
        this.currentDay = this.currentDate.getDate();
        this.currentYear = this.currentDate.getFullYear();
    },
    
}
</script>

<style lang="scss" scoped>

    .header {
        background-color: #00bcd4;
        display: flex;
        padding: 20px;
        color: #ffffff;
    }

</style>