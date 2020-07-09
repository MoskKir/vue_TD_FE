<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <TodoTable></TodoTable>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios';
import TodoTable from '../components/TodoTable';

export default {
  name: 'Home',
  components: {
    TodoTable,
  },
  data: () => ({

  }),
  // mounted() {
  //   this.getUser()
  // },
  // methods: {
  //   getUser: async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3003/api/todos/');
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }
}
</script>

<style lang="scss">
  .home {
    margin: 0 auto;
  }
</style>
