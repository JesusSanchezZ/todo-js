import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );

console.log('todos', todoList.todos);
//todoList.todos.forEach( todo => crearTodoHtml(todo));

// const tarea = new Todo('Aprender JavaScript');
// todoList.nuevoTodo(tarea);

// console.log(todoList);

// crearTodoHtml( tarea );

// localStorage.setItem('mi-key','ABC123');
// sessionStorage.setItem('mi-key','ABC12345');

// setTimeout(() =>{
//     localStorage.removeItem('mi-key');
// },3000);