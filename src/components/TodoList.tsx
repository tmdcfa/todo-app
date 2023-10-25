import React from 'react';
import "./styles.css";
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';


type TodoListProps = {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
};

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, completedTodos, setCompletedTodos, setTodo }: TodoListProps) => {
    return (
        <div className="container">
            <Droppable droppableId='TodosList'>
                {(provided) => (
                    <div
                        className="todos"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {todos.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todo={todo}
                                todos={todos}
                                key={todo.id}
                                setTodo={setTodo}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable >
            <Droppable droppableId='TodosRemove'>
                {(provided) => (
                    <div
                        className="todos remove"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Completed Tasks</span>
                        {completedTodos.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todo={todo}
                                todos={completedTodos}
                                key={todo.id}
                                setTodos={setCompletedTodos}
                                setTodo={setTodo}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;