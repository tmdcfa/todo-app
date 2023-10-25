import React, { useState, useEffect, useRef } from 'react'
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type SingleTodoProps = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index: number,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
}

const SingleTodo = ({ todo, todos, setTodos, index, setTodo }: SingleTodoProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map((item) => item.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    };
    const handleDelete = (id: number) => {
        setTodos(todos.filter((item) => item.id !== id));
    };
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((item) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
        setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);


    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <form
                    className="todos__single"
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {edit ? (
                        <input
                            value={editTodo}
                            ref={inputRef}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className="todos__single--text" />
                    ) : (todo.isDone ? (
                        <s className="todos__single--text">
                            {todo.todo}
                        </s>

                    ) : (<span className="todos__single--text">
                        {todo.todo}
                    </span>
                    ))}

                    <div>
                        <span className="icon">
                            <AiFillEdit onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }
                            }} />
                        </span>
                        <span className="icon">
                            <AiFillDelete onClick={() => handleDelete(todo.id)} />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdOutlineDone />
                        </span>
                    </div>
                </form>)
            }

        </Draggable>
    );
};

export default SingleTodo;