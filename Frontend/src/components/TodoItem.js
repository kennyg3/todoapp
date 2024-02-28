import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync, editTodoAsync } from '../redux/todoSlice'; 

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
//to show current title when user is editing
	useEffect(() => {
        if (isEditing) {
            setEditedTitle(title);
        }
    }, [isEditing, title]);

    const handleCompleteClick = () => {
        dispatch(toggleCompleteAsync({ id: id, completed: !completed }));
    }

    const handleDeleteClick = () => {
        dispatch(deleteTodoAsync({ id: id }));
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveEdit = () => {
        dispatch(editTodoAsync({ id: id, title: editedTitle }));
        setIsEditing(false);
    }

    const handleCancelEdit = () => {
        setEditedTitle(title);
        setIsEditing(false);
    }

    return (
        <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
            {isEditing ? (
                <div>
                    <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                    <button className="btn btn-primary" onClick={handleSaveEdit}>Save</button>
                    <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <div className='d-flex justify-content-between'>
                    <span className='d-flex align-items-center'>
                        <input type='checkbox' onChange={handleCompleteClick} className='mr-3' checked={completed}></input>
                        {title}
                    </span>
                    <div>
                        <button className='btn btn-primary mr-2' onClick={handleEditClick}>Edit</button>
                        <button className='btn btn-danger' onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TodoItem;
