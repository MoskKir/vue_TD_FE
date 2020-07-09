<template>
    <v-row
    > 
        <LoginForm></LoginForm>
        <SingupForm></SingupForm>

    </v-row> 
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'
import SingupForm from '@/components/SingupForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
    SingupForm
  }
}
</script>