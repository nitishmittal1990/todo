import React, { useState } from 'react';
import './Todo.css';


function Todo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTodoText, setNewTodoText] = useState(props.name);

    const handleTodoStatus = (e) => {
        props.completeTodo(e.target.dataset.id, e.target.checked);
    }

    const handleClick = (e) => {
        props.deleteTodo(e.target.dataset.id);
    }

    const handleEditTodo = (e) => {
        setIsEditing(true);
    }

    const handleUpdateTodo = (e) => {
        if(newTodoText !== '') {
            props.updateTodo(e.target.dataset.id, newTodoText);
            setIsEditing(false);
        }
    }

    const handleChange = (e) => {
        setNewTodoText(e.target.value);
    }

    return (
        <div className={props.isCompleted ? 'todo done' : 'todo'} id={props.id} key={props.id}> 
            <div className="form-group">
                <input className="checkbox" type="checkbox" checked={props.isCompleted} onChange={handleTodoStatus} data-id={props.id} />
                <label></label>
            </div>
            {isEditing ? (<input defaultValue={props.name} autoFocus className="editinput" onChange={handleChange} />) : (<p>{props.name}</p>)}
            <div className="todo-actions">
                <div className="todobtns">
                    {props.isCompleted ? '' : (<button onClick={handleEditTodo}>Edit</button>)}
                    {isEditing ? (<button onClick={handleUpdateTodo} className='updatebtn' data-id={props.id}>Update</button>) : ''}
                </div>
                <button className='delete-btn' onClick={handleClick} data-id={props.id}>Delete</button>
            </div>
        </div>
    )
}


export default Todo;