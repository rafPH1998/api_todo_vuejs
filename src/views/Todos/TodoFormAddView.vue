<template>

    <div class="px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
            <div v-show="todos.showMsgSuccess" 
                class="p-4 mb-4 text-sm text-green-700 
                bg-green-100 rounded-lg dark:bg-green-200 
                dark:text-green-800" role="alert">
                <span class="font-medium">Sucesso!</span> Nova tarefa criada!
            </div>

            <div class="p-4 mb-4 text-sm text-red-700 
                bg-red-100 rounded-lg dark:bg-red-200 
                dark:text-red-800" role="alert" 
                v-for="erro in todos.errors.title" 
                :key="erro.id">
                {{erro}}
            </div>

            <form @submit.prevent="addTodo()" action="#" method="POST">
                <div class="w-full">
                    <div class="relative flex items-center justify-center z-0 mb-6 w-full group">
                        <input type="text" name="title" id="title" 
                            v-model="todos.title"
                            class="block py-2.5 px-0 w-full text-sm text-white 
                                    bg-transparent border-0 border-b-2 border-white-300 
                                    appearance-none dark:text-white dark:border-white-600 
                                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:border-blue-600 peer" placeholder=" " />
                            <label for="title" 
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                peer-focus:scale-75 peer-focus:-translate-y-6">Digíte a tarefa
                            </label>
                    </div>
                </div>

                <button :disabled="todos.loading"
                        type="submit" class="text-white bg-blue-700 
                        hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm w-full
                        sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 
                        dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span v-if="todos.loading">Adicionando...</span>
                        <span v-else>Adicionar</span>
                </button>

                <router-link :to="{name: 'todos.index'}" 
                        class="ml-3 text-green-400 text-xs font-semibold bg-green-700 
                        hover:bg-green-800 focus:ring-4 focus:outline-none 
                        focus:ring-green-300 font-medium rounded-lg text-sm w-full
                        sm:w-auto px-5 py-3.5 text-center dark:bg-green-600 
                        dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Voltar
                </router-link>
            </form>
        </div>
    </div>
    <!--/ Todo form -->
</template>

<script>
import { reactive } from 'vue'
import TodoService from '@/services/todos.service'

export default {
    name: 'TodoFormAddView',
    setup () {

        const todos = reactive ({
            title: '',
            completed: false,
            errors: '',
            showMsgSuccess: false,
            loading: false,
        })
        
        const addTodo = () => {
            todos.loading = true
            
            TodoService.addTodo({...todos})
                        .then((response) => {
                            if (response.status == 201) {
                                todos.showMsgSuccess = true
                                todos.errors = ''
                                todos.title = '' 

                                setTimeout(() => {
                                    todos.showMsgSuccess = false
                                }, 4000);
                            }                     
                        })
                        .catch((error) => {
                            todos.errors = error.response.data.errors;
                        })    
                        .finally(() => todos.loading = false)                    
        }
        return {
            addTodo,
            todos
        }
    }

}
</script>