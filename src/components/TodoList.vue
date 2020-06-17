<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Enter your todo"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div class="todo-item" v-for="(todo, index) in todos" :key="todo.id">
      <div class="todo-item-left">
        <div
          v-if="!todo.onEditing"
          @dblclick="editTodo(todo)"
          class="todo-item-label"
        >
          {{ todo.title }}
        </div>
        <input
          v-else
          type="text"
          class="todo-item-edit"
          v-model="todo.title"
          @blur="onFinishEdit(todo)"
          @keyup.enter="onFinishEdit(todo)"
          v-focus
        />
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      newTodo: "",
      nextId: 1,
      todos: []
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) return;

      this.todos.push({
        id: this.nextId,
        title: this.newTodo,
        completed: false,
        onEditing: false
      });

      this.newTodo = "";
      this.nextId++;
    },
    editTodo(todo) {
      todo.onEditing = true;
    },
    onFinishEdit(todo) {
      todo.onEditing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-item {
  cursor: pointer;
  margin-left: 12px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 12px;
  color: #2c3e50;
  margin-left: 10px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 24px;

  &:focus {
    outline: none;
  }
}
</style>
