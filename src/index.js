import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


// action creator
const addToDo = (text) => {
  return {
    type: ADD_TODO, 
    text: text 
  }
}

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

// reducer
const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = {text: action.text, id: Date.now()};
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleand = state.filter(toDo => toDo.id !== action.id);
      return cleand;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log((store.getState())));


// dispatch
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
}
const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}


// paintTodos
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = 'DEL';
    btn.addEventListener('click', dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText= toDo.text;
    li.appendChild(btn);
    ul.append(li);
  })
}

store.subscribe(paintToDos);


// onSubmit
const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);