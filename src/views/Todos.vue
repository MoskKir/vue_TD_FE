<template>
    <div class="todo-container" ref="todoContainer">
        <TodoTable></TodoTable>
    </div>
</template>

<script>
import { TimelineLite } from "gsap";

import TodoTable from "../components/TodoTable";
import Animation from "../helpers/animations";

export default {
    name: "Todos",
    components: {
        TodoTable,
    },
    data: () => ({}),
    mounted() {
        const { todoContainer } = this.$refs;
        const timeline = new TimelineLite();

        timeline.fromTo(
            todoContainer,
            {
                y: -500,
            },
            {
                y: 75,
            }
        );
        timeline.to(todoContainer, {
            y: 0,
        });
    },
    beforeRouteLeave(to, from, next) {
        const { todoContainer } = this.$refs;
        Animation.out(todoContainer, next);
    },
};
</script>

<style lang="scss">
.todo-container {
    margin: 0 auto;
    height: fit-content;
}
</style>
