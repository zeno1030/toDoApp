const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(), 
        text: "", 
        complete: false
    }
    //배열 처음에 새로운 아이템 추가
    todos.unshift(item);
    // 요소 생성하기
    const {itemEl, inputEl} = createTodoElement(item);

    list.prepend(itemEl); //노드를 fisrt child 이전에 집어넣는 것

    inputEl.removeAttribute('disabled');
    inputEl.focus();
    saveToLocalStorage(itemEl);
}

function createTodoElement(item){
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;

    inputEl.setAttribute('disabled', '');

    const actionEl = document.createElement('div');
    actionEl.classList.add('action');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerHTML = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'material-icons');
    removeBtnEl.innerHTML ='remove_circles';

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if (item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t=>t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })

    actionEl.append(editBtnEl);
    actionEl.append(removeBtnEl);

    itemEl.appendChild(checkboxEl);
    itemEl.appendChild(inputEl);

    itemEl.append(actionEl);

    return {itemEl, inputEl, removeBtnEl, editBtnEl};

}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    window.localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
    const data = window.localStorage.getItem('my_todos');
    if (data) {
        todos = JSON.parse(data);
    }
}


function displayTodos() {
    loadFromLocalStorage();
    for (let index=0; index < todos.length; index++) {
        const item = todos[index];
        const {itemEl} = createTodoElement(item);

        list.append(itemEl)
    }
}

displayTodos();