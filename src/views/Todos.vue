<template>
  <div class="todo-container">
    <TodoTable></TodoTable>
  </div>
</template>

<script>
import TodoTable from '../components/TodoTable';

export default {
  name: 'Todos',
  components: {
    TodoTable,
  },
  data: () => ({

  }),
}
</script>

<style lang="scss">
  .todo-container {
    margin: 0 auto;
  }
</style>
