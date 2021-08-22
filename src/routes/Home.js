 import React, { useState } from 'react';
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';
import { actionCreators } from '../store';
 
function Home({ toDos, addToDo }) {
  console.log(toDos);
  const [text, setText] = useState('');
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText('');
    console.log(text);
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type='text' value={text} onChange={onChange}/>
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
      </ul>
    </>
  )
}

// mapStateToProps(state, ownProps?)
// Redux state로부터 home(component)에 prop으로써 전달
// Home으로 보내는 props에 getCurrentState 함수의 리턴 값을 포함해 준다.
function mapStateToProps(state) {
  return {
    toDos: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text)),
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(Home);