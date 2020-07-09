<template>
    <v-col 
        align="center"           
    >
        <v-form 
            v-model="valid"
            ref="form" 
            class="login-form"    
        >
            THis login form
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

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="login"
            >
                Log In
            </v-btn>

            <v-btn
                color="error"
                class="mr-4"
                @click="reset"
            >
                Reset Form
            </v-btn>
        </v-form>
        
    </v-col>

</template>

<script>
  export default {
    name: 'LoginForm',

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
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      login() {          
        console.log( this.firstname, this.email)
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>

<style lang="scss">
    .login-form {
        width: 50%;
    }
</style>