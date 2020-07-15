<template>
    <div> item {{ id }}</div>
</template>

<script>
export default {
    props: ['id'],
}
</script>

<style lang="scss" scoped>
    div {
        width: 100vw;
        height: calc(100vh - 20vh);
    }
</style>