/*
PASSOS DA CRIAÇÃO DE JS
    - SELEÇÃO DE ELEMENTOS
    - FUNÇÕES
    - EVENTOS
*/

//SELEÇÃO DE ELEMENTOS------------------------------------------------------
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;


// FUNÇÕES------------------------------------------------------------------
// saveTodo recebe um (text) da tarefa
// a funcao abaixo vai criar a div de tarefa de forma "programática"
const saveTodo = (text) => {
    // cria a div geral
    const todo = document.createElement('div');
    // cria a classe da div
    todo.classList.add('todo');
    // cria o elemento h3...
    const todoTitle = document.createElement('h3');
    // ... e adiciona o (text) recebido na função.
    todoTitle.innerText = text;
    // adiciona o elemento h3 na div de class 'todo'
    todo.appendChild(todoTitle);
    //veja (console navegador) que foi criado uma div com h3
    console.log(todo);
    /*
        CRIAMOS ISTO NO HTML:
        <div class="todo">
            <h3>texto digitado no input</h3>
        </div>
    */

    // Agora vamos criar o 1o botão
    const doneBtn = document.createElement("button");
    doneBtn.classList.add('finish-todo');
    //agora adicionar o icone no botao com innerHTML(entramos con cod HTML)
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    // vamos adicionar na div "todo" o botao
    todo.appendChild(doneBtn);

    // Agora vamos criar o 2o botão
    const editBtn = document.createElement("button");
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    // Agora vamos criar o 3o botão
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    // Agora vamos adicionar tudo que fizemos na div geral (todo-list)
    todoList.appendChild(todo);
    console.log(todoList);

    // Limpa o campo input e coloca o focus nele
    todoInput.value = "";
    todoInput.focus();
}

// FUNCAO ESCONDER UM FORMULARIO E MOSTRAR OUTRO
const toggleForms = () => {
    // esconde ou mostra (toggle) uma div
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

// FUNCAO EDITA UMA TAREFA

const updateTodo = (text) => {
     const todos = document.querySelectorAll('.todo');
     todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
     })
}


// EVENTOS------------------------------------------------------------------
// Fica escutando o evento (e) no todo-form submit (envio) do formulario:
todoForm.addEventListener('submit', (e) => {
    //evita envio do formulario pro backend qndo press button
    e.preventDefault();
    //pega valor do input pra criar uma tarefa
    const inputValue = todoInput.value
    //validação do input
    if(inputValue) {
        //chama a função que vai salvar o valor do input
        saveTodo(inputValue)

    }
});

// vamos escutar todo o documento, procurando um click nos botões
document.addEventListener("click", (e) => {
    // pega o elemento que foi clicado
    const targetE1 = e.target;
    // vamos pegar a div pai do botao (pq o botao pode estar em qqr div)
    const parentE1 = targetE1.closest("div")

    // vamos editar a div com base no titulo já que nao temos um ID
    let todoTitle;
    // se tem o pai e dentro dele um h3.. então vamos pegar o texto do h3
    if(parentE1 && parentE1.querySelector("h3")) {
        todoTitle = parentE1.querySelector("h3").innerText;
    }



    // mapeia se na classList tem o evento "finish-todo"
    if(targetE1.classList.contains('finish-todo')) {
        console.log("finalizou")
        // adiciona a class done ao pai (.toggle adiciona ou se ja tem retira)
        parentE1.classList.toggle('done')
    }
    // mapeia se na classList tem o evento "edit-todo"
    if(targetE1.classList.contains('edit-todo')) {
        console.log("editou")
        //chama a funcao
        toggleForms()

        // coloca o titulo no input e salva ele numa variável global oldInputValue
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
    // mapeia se na classList tem o evento "remove-todo"
    if(targetE1.classList.contains('remove-todo')) {
        console.log("removeu")
        // remove o elemento pai
        parentE1.remove();
    }
});

// botão cancelar edição

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // inverte os hides
    toggleForms()
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // pega o novo valor da tarefa
    const editInputValue = editInput.value;

    if(editInputValue) {
        // chama funcao que edita o valor do input enviando o novo valor
        updateTodo(editInputValue)
    }
    toggleForms();

});

