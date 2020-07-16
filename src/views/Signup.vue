<template>
    <div
      class="container"
    > 
      
          <LoginForm></LoginForm>
          <!-- <SingupForm></SingupForm> -->
          <br>
          <div class="description">
            <p>
              Don't have an account?
              <a link to="/">
                Sign up for TODO Aplication 
              </a>
            </p>
            
          </div>
          <br>
    </div> 
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
// import SingupForm from '@/components/SingupForm.vue'

export default {
  name: 'Signin',
  components: {
    LoginForm,
    // SingupForm
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 50px;
    width: calc(100% - 40%);
    max-width: 800px;
    height: fit-content;
    padding: 20px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 
                    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
                    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
                  
  }

  p {
    // width: 70%;
    margin: 0 auto;
    text-align: center;
  }
</style>