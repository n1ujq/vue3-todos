<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>{{ listName }}</h1>
      </div>
    </div>
    <div class="row mb-3">
      <form class="col-12 col-sm-10 col-md-8 cl-lg-6" @submit.prevent="addTodo()">
        <input
          v-model="newTodo.description"
          type="text"
          class="form-control"
          placeholder="Create a new to-do..."
        />
      </form>
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo-item
            v-for="todo in todos"
            :key="todo.id"
            :description="todo.description"
            :completed="todo.completed"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, defineProps } from 'vue'
import { Todo } from '../models'
import TodoItem from './Todo.vue'

defineProps({
  listName: String
})

const state = reactive({
  newTodo: {},
  todos: []
})

const { todos, newTodo } = toRefs(state)

onBeforeMount(async () => {
  state.todos = await Todo.list()
  state.newTodo = state.todos.new()
  console.log({ state })
})

async function addTodo () {
  if (!state.newTodo.description) return

  await state.newTodo.save()

  state.newTodo = state.todos.new()
}

async function toggleTodo (todo) {
  todo.completed = !todo.completed
  await todo.save()
}

async function editTodo (todo, newTodoDescription) {
  todo.description = newTodoDescription
  await todo.save()
}

async function deleteTodo (deletedTodo) {
  await deletedTodo.destroy()
}
</script>
