import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: [],
        filter: "all",
        nextId: 1
    },
    getters: {
        remainingTodos(state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining(state, getters) {
            return getters.remainingTodos != 0;
        },
        filteredTodos(state) {
            if (state.filter == "all") return state.todos;
            else if (state.filter == "completed")
                return state.todos.filter(todo => todo.completed == true);
            else
                return state.todos.filter(todo => todo.completed == false);
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.completed == true).length > 0;
        },
        getTodoId(state) {
            return state.nextId;
        }
    },
    mutations: {
        incrementNextId(state) {
            state.nextId++;
        },
        updateFilter(state, filter) {
            console.log("called update in store");
            state.filter = filter;
        },
    }
})