<template>
  <v-data-table 
    v-model="selected" 
    :headers="headers" 
    :items="allTodos" 
    class="elevation-1"
    >

    <template v-slot:item.status="{ item }">
      <v-checkbox
        v-model="item.status"
        color="success"
      ></v-checkbox>
    </template>

    <template v-slot:item.status_desc="{ item }">
          {{item.status ? 'Done' : 'Undone'}}
    </template>

    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>My TODOS</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New TODO</v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">Заголовок</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-checkbox
                            label="Status"
                            color="success"
                            value="success"
                            hide-details
                            v-model="newTodo.status"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Title" v-model="newTodo.title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Description" v-model="newTodo.description"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save(newTodo)">Save</v-btn>
                  </v-card-actions>
                </v-card>

            </v-dialog>
        </v-toolbar>
    </template>

    <template v-slot:item.title="{ item }" >
        <span @click="tableRowTitleClick(item)"
          class="title-btn"
        >
          {{ item.title }}
        </span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
</template>

<script>
import router from "../router";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TodoTable",
  computed: mapGetters(['allTodos']),
  data: () => ({
    dialog: false,
    singleSelect: false,
    selected: [],
    headers: [
        { text: 'Status', value: 'status' },
        { text: 'Description', value: 'status_desc' },
        { text: 'Title', value: 'title' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    newTodo: {
      status: false,
      title: '',
      description: ''
    }
  }),
  async mounted() {
    this.getRequestTodos();
  },
  methods: {
    ...mapActions(['getRequestTodos', 'addNewTodo', 'deleteTodo']),
    tableRowTitleClick(value) {
        router.push({ path: `/todo/${value.todo_id}` });
    },
    editItem(item) {
      console.log(item)
    },
    deleteItem(item) {
      this.deleteTodo(item.todo_id);
    },
    close() {
      this.dialog = false;
    },
    save(item) {
      this.addNewTodo(item);
      this.dialog = false;
      console.log(item)
    },
  }
};
</script>

<style lang="scss">
  .title-btn {
    cursor: pointer;
  }
  .test {
    display: flex;
  }
</style>