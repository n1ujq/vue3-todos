<template>
  <li class="d-flex align-items-center list-group-item">
    <button
      class="btn border-0 flex-grow-1 text-left shadow-none"
      :class="{ completed }"
      @click="$emit('on-toggle')"
      v-if="!isEditing"
    >
      <span>{{ description }}</span>
    </button>
    <form v-else class="flex-grow-1" @submit.prevent="finishEditing()">
      <input
        type="text"
        class="form-control"
        v-model="newTodoDescription"
        @blur="finishEditing()"
        ref="newTodo"
      />
    </form>
    <button
      @click="startEditing()"
      class="btn btn-outline-primary border-0 ml-2"
    >
      <span class="fa fa-edit"></span>
    </button>
    <button @click="$emit('on-delete')" class="btn btn-outline-danger border-0">
      <span class="fa fa-trash"></span>
    </button>
  </li>
</template>

<script setup>
import { ref, defineProps, defineEmits, nextTick } from 'vue'

const props = defineProps({
  description: String,
  completed: Boolean
})

const isEditing = ref(false)
const newTodoDescription = ref('')
const newTodo = ref(null)

const emit = defineEmits(['on-edit', 'on-delete', 'on-toggle'])

function startEditing () {
  if (isEditing.value) {
    finishEditing()
  } else {
    newTodoDescription.value = props.description.value
    isEditing.value = true
    nextTick(() => {
      newTodo.value.focus()
    })
  }
}

function finishEditing () {
  isEditing.value = false
  emit('on-edit', newTodoDescription.value)
}
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
</style>
