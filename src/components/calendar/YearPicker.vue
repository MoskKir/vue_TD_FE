<template>
    <div class="year-picker-items">
        <div>
            <button @click="selectedYear = --currentYear">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" 
                    fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
                </svg>
            </button>
        </div>
        <div>
            <button class="picker-btn">
                {{ selectedYear }}
            </button>
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
    name: 'YearPicker',
    data: () => ({
        selectedYear: null
    }),
    created: function() {
        const date = new Date;
        this.currentYear = date.getFullYear();
        this.selectedYear = this.currentYear;
    },
    watch: {
        selectedYear: function() {
            this.$emit('emitSelectedYear', this.selectedYear)
        }
    }

}
</script>

<style lang="scss" scoped>
    .year-picker-items {
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
    }

    .picker-btn:hover {
        background-color: #ffffff00;
    }

    button:hover {
        background-color: #6156a07a;
    }

</style>