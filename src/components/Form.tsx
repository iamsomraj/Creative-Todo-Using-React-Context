import React from "react";
import { useTodoContext } from "../context/TodoContext";

const Form: React.FC = () => {
  const { todoInput, setTodoInput, setTodos, view, setView } = useTodoContext();

  const clearInput = () => {
    setTodoInput("");
  };

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodoInput(event.target.value);
  };

  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    if (todoInput.trim().length === 0) {
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.random().toString(),
        text: todoInput,
        completed: false,
      },
    ]);
    clearInput();
  };

  const filterChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setView(event.target.value);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        className="todo-input"
        value={todoInput}
        onChange={inputChangeHandler}
      />
      <button type="submit" className="todo-button">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select
          name="todos"
          className="filter-todo"
          value={view}
          onChange={filterChangeHandler}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
