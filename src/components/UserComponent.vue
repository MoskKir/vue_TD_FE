<template>
    <div class="main-container">
        <h2>Account</h2>
        <div class="login-container">
            <span class="title-span">Login:</span> {{ user.login }}
        </div>
        <div class="email-container">
            <span class="title-span">Email:</span> {{ user.email }}
        </div>
        
        
    </div>
</template>

<script>

export default {
    data: () => ({
        user: {
            login: null,
            email: null
        },
    }),
    mounted() {
        this.user = this.$store.getters.getUserGetter;
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    padding: 10px;
    background-color: white;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.main-container > div {
    margin-bottom: 20px;
    padding-right: 30px;
}

h2 {
    margin: 20px 40px;
}

.title-span {
    padding: 10px 30px;
    font-size: 20px;
    font-weight: 700;
}
</style>