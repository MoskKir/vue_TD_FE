<template>
    <div class="year-picker-items">
        <div>
            <button>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" 
                    fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
                </svg>
            </button>
        </div>
        <div>
            <button>
                Year
            </button>
        </div>
        <div>
            <button>
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
    name: 'YearPicker'
}
</script>

<style lang="scss">
    .year-picker-items {
        display: flex;
    }
</style>