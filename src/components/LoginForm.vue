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

                    
            <!-- <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field> -->

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
  export default {
    name: 'LoginForm',
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => /.+@.+\..+/.test(v) || 'Password must be valid',
        ],
        showPassword: false,
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      signin() {          
        console.log( this.firstname, this.email)
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