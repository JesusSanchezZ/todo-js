import { todoList } from "../index";
import { Todo } from "../classes";

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const countPend     = document.querySelector('.todo-count');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ todo.completado ? 'completed': '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    actualizaCuenta();

    return div.firstElementChild;
}

const actualizaCuenta = () => {
    let todos = todoList.todos.length;
    let completados = 0;

    todoList.todos.forEach( elem => {
        if( elem.completado ){
            completados ++;
        }
    });

    // console.log(completados);
    // console.log(todos - completados);

    const strong = countPend.firstChild;
    strong.innerText = todos - completados;

    //countPend.children.contains('strong').text = todos - completados;
}


// Eventos
txtInput.addEventListener('keyup', (event) => {
    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        const nuevoTodo = new Todo(txtInput.value);
        //console.log(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        actualizaCuenta();
    }
});

divTodoList.addEventListener('click', (event) => {
    // console.log('click');
    // console.log(event.target.localName);
    const nombreElemento = event.target.localName;  // input, label, button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    // console.log( todoElemento );
    // console.log(todoId);
    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        actualizaCuenta();
        todoElemento.classList.toggle('completed');
    } else if( nombreElemento.includes('button')){
        todoList.eliminarTodo( todoId );
        actualizaCuenta();
        divTodoList.removeChild( todoElemento );
    }

    //console.log(todoList);
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
            actualizaCuenta();
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    //console.log(event.target.text);
    const filtro = event.target.text;
    if( !filtro ) return;

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    //console.log(event.target);

    for( const elemento of divTodoList.children ){
        //console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
})