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
                Create your TODO App account
            </p>
            <v-text-field
                v-model="firstname"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
            ></v-text-field>

                    
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
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

            <v-checkbox
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree with my authoritarian rules?"
                color="success"
                required
            ></v-checkbox>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="signup"
            >
                Get started
            </v-btn>

        </v-form>
        
    </v-col>

</template>

<script>
import router from "../router";
import { mapActions } from "vuex";

export default {
    name: 'SingupForm',
    data: () => ({
        valid: true,
        firstname: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
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
        ...mapActions(['addNewUser']),
        validate () {
            this.$refs.form.validate();
        },
        signup() {
            const user = {
                login: this.firstname,
                email: this.email,
                password: this.password
            }

            this.addNewUser(user);
            
            router.push({ path: '/auth/signin' });
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
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
    }

</style>