<template>
    <div>
        <p>
            selected days panel
        </p>
        <ul>
            <li v-for="(pickedDay, index) of pickedDayArr" :key="index">
                {{ pickedDay }}
                <button @click="removeDay(index)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['pickedDayArr'],
    model: {
        prop: 'pickedDayArr',
        event: 'removeDay'
    },
    methods: {
        changeValue(newVal) {
            this.$emit("modified", newVal);
        },
        removeDay(index) {
            this.pickedDayArr.splice(index, 1)
            this.$emit('removeDay', this.pickedDayArr);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>