import React, { createContext, useContext, useEffect, useState } from "react";

interface TodoType {
  id: string;
  text: string;
  completed: boolean;
}

interface ITodoContextType {
  todoInput: string;
  setTodoInput: React.Dispatch<React.SetStateAction<string>>;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  filteredTodos: TodoType[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export const TodoContext =
  createContext<ITodoContextType | undefined>(undefined);

export const TodoProvider: React.FC = (props) => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [view, setView] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const savedTodosInString = localStorage.getItem("todos");
    if (savedTodosInString !== null) {
      const savedTodos = JSON.parse(savedTodosInString);
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    const saveMyTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
    const filterMyTodos = () => {
      switch (view) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterMyTodos();
    saveMyTodos();
  }, [todos, view]);

  return (
    <TodoContext.Provider
      value={{
        todoInput,
        setTodoInput,
        todos,
        setTodos,
        view,
        setView,
        filteredTodos,
        setFilteredTodos,
      }}
      {...props}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("Please provide a value to provider");
  }
  return context;
};
