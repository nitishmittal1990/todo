import React, { useState } from 'react';
import './App.css';

import Todo from './components/Todo.js';


function App() {
  const [todos, setTodos] = useState([]);

  const getUpperIndex = (todoList) => {
    
    let index = 0;
    for (let eachtodo of todoList) {
      if (Number(eachtodo.id) > index) {
        index = eachtodo.id;
      }
    }
    
    return index;
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      createTodo();
    }
  }

  const createTodo = () => {
    const newTodo = document.getElementById('todo').value;
    let upperIndex = getUpperIndex(todos);
     if(newTodo !== '') {
       let newTodoObject = {
         'id': upperIndex + 1,
         'name': newTodo,
         'isCompleted': false
       };
       const newTodoList = [newTodoObject, ...todos];
       setTodos(newTodoList);
       document.getElementById('todo').value = '';
     }
     
  }


  const completeTodo = (todoId, isCompleted) => {
    todoId = Number(todoId);
    const newTodos = [...todos];
    const todoToBeUpdated = newTodos.filter((todo) => {
      return todo.id === todoId;
    });

    const getIndexOfTodo = newTodos.findIndex((todo) => todo.id === todoId);

    if(getIndexOfTodo > -1) {
      newTodos.splice(getIndexOfTodo, 1);
      let upperIndex = getUpperIndex(newTodos);
      const updatedTodoItem = {
        'id': upperIndex + 1,
        'name': todoToBeUpdated[0].name,
        'isCompleted': isCompleted
      };

      newTodos.push(updatedTodoItem);
      setTodos(newTodos);
    }

  }

  const deleteTodo = (todoId) => {
    todoId = Number(todoId);
    const newTodos = [...todos];
    const deleteTodoIndex = newTodos.findIndex((todo) => todo.id === todoId);
    if(deleteTodoIndex > -1) {
      newTodos.splice(deleteTodoIndex, 1);
      setTodos(newTodos);
    }
  }

  const updateTodo = (todoId, todoText) => {
    todoId = Number(todoId);
    let newTodos = [...todos];
    newTodos = newTodos.map((eachtodo) => {
      if(eachtodo.id === todoId) {
        eachtodo.name = todoText;
      } 
      return eachtodo;
    })
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
      </header>
      <main>
        <div className="add-todo">
          <input type="text" name="todo" placeholder="Enter Todo Text" id="todo" onKeyPress={handleKeyPress} />
          <input type="submit" value="Create Todo" onClick={createTodo} />
        </div>
        {todos.length > 0 ? (
          todos.map((todo) => {
            return <Todo 
                      key={todo.id} 
                      id={todo.id}
                      name={todo.name}
                      isCompleted={todo.isCompleted}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                      updateTodo={updateTodo} 
                    />
          })
        ) : ''}
        
      </main>
    </div>
  );
}

export default App;
