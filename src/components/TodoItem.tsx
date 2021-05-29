import React from "react";
import { useTodoContext } from "../context/TodoContext";

interface TodoItemProps {
  text: string;
  id: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todos, setTodos } = useTodoContext();

  const deleteBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const newTodos = todos.filter((todo) => todo.id !== props.id);
    setTodos(newTodos);
  };

  const completeHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === props.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="todo">
      <li className={`todo-item ${props.completed ? "completed" : ""}`}>
        {props.text}
      </li>
      <button
        className="complete-btn"
        onClick={completeHandler}
      >
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn" onClick={deleteBtnHandler}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default TodoItem;
