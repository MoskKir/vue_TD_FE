<template>
    <div class="container" ref="signinContainer">

        <v-checkbox 
            v-model="status"
            label="Status"
            color="success"
        ></v-checkbox>

        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        
        <div class="btn-container">
            <v-btn color="grey darken-4" text @click="back">Cancel</v-btn>
            <v-btn color="red darken-4" text @click="deleteFn">Delete</v-btn>
            <v-btn color="green accent-4" text @click="save(newTodo)">Save</v-btn>
        </div>

    </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";
import Animation from "../helpers/animations";

export default {
    props: ['id'],
    data: () => ({
        todo: null,
        title: null,
        description: null,
        status: null,
        prevRoute: null,
    }),
    async beforeMount() {
        this.todo = await this.getTodo(this.id);

        this.title = this.todo.title
        this.description = this.todo.description
        this.status = this.todo.status
    },
    mounted() {
        this.signinContainer = this.$refs.signinContainer;

        Animation.from(this.signinContainer);
    },
    beforeRouteLeave(to, from, next) {
        Animation.out(this.signinContainer, next);
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from
        })
    },
    methods: {
        ...mapActions(["getTodo", "deleteTodo"]),
        back() {
            (this.prevRoute) 
            ? router.push(this.prevRoute) 
            : router.push({route: '/'});
        },
        async deleteFn() {
            await this.deleteTodo(this.id);
            this.back();
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    background-color: #ffffff;
    margin-top: 50px;
    width: 90%;
    max-width: 800px;
    height: fit-content;
    padding: 20px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.btn-container {
    text-align: end;
}
</style>