<template>
     <div class="px-3 py-10 md:px-10">
       <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

            <div v-show="messageSuccess"
                class="p-4 mb-4 text-sm text-green-700 
                bg-green-100 rounded-lg dark:bg-green-200 
                dark:text-green-800" role="alert">
                <span class="font-medium">Sucesso!</span> Tarefa deletada com sucesso!
            </div>

            <router-link :to="{name: 'todos.add'}"
                class="text-green-400 text-xs 
                font-semibold 
                focus:outline-none"
                type="submit"
                >Adicionar nova tarefa
            </router-link>

            <TodoSpinnerView v-if="loading" />
            
            <div v-else>
                <TodoItemsView
                    v-for="todo in todos" 
                    :key="todo.identify"
                    :todo="todo"
                    @todoDeleted="removeTodoList"
                    @todoUpdated="todoUpdated"
                />
                <TodoEmptyView v-show="showMessageEmpty"/>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItemsView from '@/views/Todos/TodosItemsView.vue';
import TodoEmptyView from '@/views/Todos/TodoEmptyView.vue';
import TodoSpinnerView from '@/views/Todos/TodoSpinnerView.vue';
import TodoService from '@/services/todos.service';
import { onMounted, ref } from 'vue';

export default {
    name: 'TodosView',
    components: {
        TodoItemsView,
        TodoEmptyView,
        TodoSpinnerView,
    },

    setup() {

        const todos = ref([]);
        const loading = ref(false);
        const showMessageEmpty = ref(false);
        const messageSuccess = ref(false);

        onMounted(() => {
            loading.value = true

            setTimeout(() => {
                TodoService.getAll()
                    .then((response) => {
                        todos.value = response.data.data
                        if (todos.value.length == 0) showMessageEmpty.value = true
                    })
                    .finally(() => {
                        loading.value = false
                    })
            }, 1000);
        })

        const removeTodoList = (todo) => {
                TodoService.deleteTodo(todo.identify)
                    .then((response) => {
                        todos.value.splice(todos.value.indexOf(todo), 1)

                        if (response.status == 204) {
                            messageSuccess.value = true

                            setTimeout(() => {
                                messageSuccess.value = false
                            }, 4000);
                        } 
                    })
        }

        const todoUpdated = (todo) => {
            todos.value[todos.value.indexOf(todo)] = todo
        }

        return {
            todos,
            showMessageEmpty,
            loading,
            removeTodoList,
            messageSuccess,
            todoUpdated
        }
    }

}

</script>