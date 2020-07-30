<template>
    <div class="container" ref="signinContainer">
        <SigninForm></SigninForm>

        <br />
        <div class="description">
            <p>
                Don't have an account?
                <a>
                    <router-link to="/auth/signup">
                        Sign up for TODO Aplication
                    </router-link>
                </a>
            </p>
        </div>
        <br />
    </div>
</template>

<script>
import SigninForm from "@/components/SigninForm.vue";
import Animation from "../helpers/animations";

export default {
    name: "Signin",
    components: {
        SigninForm,
    },
    data: () => ({
        signinContainer: null,
    }),
    mounted() {
        this.signinContainer = this.$refs.signinContainer;

        Animation.from(this.signinContainer);
    },
    beforeRouteLeave(to, from, next) {
        Animation.out(this.signinContainer, next);
    }
};
</script>

<style lang="scss" scoped>
.container {
    margin-top: 50px;
    width: calc(100% - 40%);
    max-width: 800px;
    height: fit-content;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

p {
    margin: 0 auto;
    text-align: center;
}
</style>
