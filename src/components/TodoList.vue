<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Enter your todo"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div class="todo-item" v-for="(todo, index) in filteredTodos" :key="todo.id">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed" />
        <div
          v-if="!todo.onEditing"
          @dblclick="editTodo(todo)"
          class="todo-item-label"
          v-bind:class="{ todoCompleted: todo.completed }"
        >{{ todo.title }}</div>
        <input
          v-else
          type="text"
          class="todo-item-edit"
          v-model="todo.title"
          @blur="onFinishEdit(todo)"
          @keyup.enter="onFinishEdit(todo)"
          @keyup.esc="onCancelEdit(todo)"
          v-focus
        />
      </div>
      <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos" />
          Check All
        </label>
      </div>

      <div>
        <button v-bind:class="{ active: filter == 'all' }" @click="updateFilter('all')">All</button>
        <button v-bind:class="{ active: filter == 'active' }" @click="updateFilter('active')">Active</button>
        <button
          v-bind:class="{ active: filter == 'completed' }"
          @click="updateFilter('completed')"
        >Completed</button>
      </div>

      <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>

      <div>{{remainingTodos}} items left.</div>
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
      beforeEdit: ""
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    remainingTodos() {
      return this.$store.getters.remainingTodos;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    filteredTodos() {
      return this.$store.getters.filteredTodos;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    },
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) return;

      this.$store.state.todos.push({
        id: this.$store.getters.getTodoId,
        title: this.newTodo,
        completed: false,
        onEditing: false
      });

      this.newTodo = "";
      this.$store.commit("incrementNextId");
    },
    editTodo(todo) {
      this.beforeEdit = todo.title;
      todo.onEditing = true;
    },
    onFinishEdit(todo) {
      if (todo.title.trim().length == 0) {
        todo.title = this.beforeEdit;
      }
      todo.onEditing = false;
    },
    onCancelEdit(todo) {
      todo.title = this.beforeEdit;
      todo.onEditing = false;
    },
    removeTodo(index) {
      this.$store.state.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.$store.state.todos.map(todo => {
        todo.completed = event.target.checked;
      });
    },
    clearCompleted() {
      this.$store.state.todos = this.$store.state.todos.filter(
        todo => todo.completed == false
      );
    },
    updateFilter(filter) {
      this.$store.commit("updateFilter", filter);
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

.todoCompleted {
  color: gray;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  outline: none;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}
.active {
  background: lightgreen;
}
</style>
