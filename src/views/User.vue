<template>
    <div class="user-main-container">
        <UserComponent class="user-container"></UserComponent>
        <MapComponent></MapComponent>
    </div>
    
</template>

<script>
import UserComponent from '../components/UserComponent';
import MapComponent from '../components/MapComponent';

export default {
    components: {
        UserComponent,
        MapComponent,
    },
}
</script>

<style lang="scss" scoped>
.user-main-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: fit-content;
    z-index: 1;
}

.user-container {
    margin-right: 10px;
}

</style>