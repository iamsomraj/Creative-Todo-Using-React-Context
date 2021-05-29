import React from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="App">
        <header>
          <h1>Creative Todo List</h1>
        </header>
        <Form />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
