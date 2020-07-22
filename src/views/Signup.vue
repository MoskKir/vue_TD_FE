<template>
    <div class="container" ref="signupContainer">
        <SingupForm></SingupForm>

        <br />

        <div class="description">
            <p>
                Already have an account?
                <a>
                    <router-link to="/auth/signin">
                        Sign in to TODO Aplication
                    </router-link>
                </a>
            </p>
        </div>
        <br />
    </div>
</template>

<script>
import SingupForm from "@/components/SingupForm.vue";
import Animation from "../helpers/animations";

export default {
    name: "Signup",
    components: {
        SingupForm,
    },
    data: () => ({
        signupContainer: null,
    }),
    mounted() {
        this.signupContainer = this.$refs.signupContainer;
        Animation.from(this.signupContainer);
    },
    beforeRouteLeave(to, from, next) {
        Animation.out(this.signupContainer, next);
    },
};
</script>

<style lang="scss" scoped>
.container {
    margin-top: 50px;
    width: calc(100% - 40%);
    max-width: 800px;
    height: fit-content;
    padding: 20px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

p {
    margin: 0 auto;
    text-align: center;
}
</style>
