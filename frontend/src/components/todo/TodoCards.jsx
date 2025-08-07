import React from 'react';
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import './todoCards.css';

const TodoCards = ({ title, description, onDelete, onUpdate }) => {
    return (
        <div className="todo-card">
            <div className="todo-content">
                <h5 className="todo-title">{title}</h5>
                <p className="todo-description">
                    {description.length > 77 ? `${description.slice(0, 77)}...` : description}
                </p>
            </div>
            <div className="todo-actions">
                <button onClick={onUpdate} className="action-btn update-btn">
                    <GrDocumentUpdate className="card-icon" /> Update
                </button>
                <button onClick={onDelete} className="action-btn delete-btn">
                    <AiFillDelete className="card-icon" /> Delete
                </button>
            </div>
        </div>
    );
};

export default TodoCards;