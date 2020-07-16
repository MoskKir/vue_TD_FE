<template>
    <v-col 
        align="center"           
    >
        <v-form 
            v-model="valid"
            ref="form" 
            class="login-form"    
        >
            <p>
                Sign in
            </p>

            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="signin"
            >
                Sign in
            </v-btn>

        </v-form>
        
    </v-col>

</template>

<script>
// import router from "../router";
import { mapActions } from "vuex";

export default {
    name: 'SigninForm',
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
        },
        showPassword: false,
    }),
    methods: {
        ...mapActions(['getUser']),
        validate () {
            this.$refs.form.validate()
        },
        signin() {   
            const user = {
                email: this.email,
                password: this.password,
            }

            this.getUser(user)
        },
    },
  }
</script>

<style lang="scss" scoped>

    .login-form {
        width: 80%;
        max-width: 400px;
    }

    p {
        text-align: left;
        font-size: 25px;
        font-weight: 700;
        text-transform: uppercase;
    }

</style>