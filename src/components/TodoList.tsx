import React from "react";
import { useTodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { filteredTodos } = useTodoContext();

  const todoList = filteredTodos.map((todoItem) => {
    return <TodoItem key={todoItem.id} {...todoItem} />;
  });

  return (
    <div className="todo-container">
      <ul className="todo-list">{todoList}</ul>
    </div>
  );
};

export default TodoList;
