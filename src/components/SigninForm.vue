<template>
    <div>
        <div 
            v-if="getErrorGetter"
            class="error-card"
        >
            <p>{{getErrorGetter}}</p>
        </div>
        <v-col 
            align="center" 
        >
            <v-form 
                v-model="valid"
                ref="form" 
                class="login-form" 
                @submit="signin"   
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
    </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
        errorMessage: null,
    }),
    computed: {
        ...mapGetters(['getErrorGetter', 'getUserGetter']),
    },
    created() {
        const component = this;
        this.handler = function (event) {
            if( event.key === 'Enter' ) component.signin();
        }
        window.addEventListener('keyup', this.handler);
    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.handler);
    },
    methods: {
        ...mapActions(['getUser']),
        validate() {
            this.$refs.form.validate()
        },
        async signin() {  
            const user = {
                email: this.email,
                password: this.password,
            }                

            if (!user.email) this.$store.commit('setError', new Error('Enter email'))
            else if (!user.password) this.$store.commit('setError', new Error('Enter password'))
            else await this.getUser(user);

            if (this.getErrorGetter) {
                setTimeout(() => {
                    this.$store.commit('setError', null)
                }, 5000)
                if (this.getUserGetter) this.$router.go(-1);
            } else {
                this.$router.go(-1);
            }                       
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

    .error-card {
        position: absolute;
        right: -50px;
        top: -15px;
        color: #ff0000;
        border: 1px solid red;
        padding: 5px 20px;
        p {
            font-size: 15px;
            margin: 0;
        }
    }

</style>