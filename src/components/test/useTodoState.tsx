import { useState } from "react";

export default (initialValue) => {
  const [todos, setTodos] = useState(initialValue);

  return {
    todos,
    addTodo: (todoText) => {
      setTodos([...todos, todoText]);
    },
    deleteTodo: (todoIndex) => {
      const newTodos = todos.filter(function(_, index) {
        // console.log(_);
        // console.log(index);
        // console.log(todoIndex);
        return index !== todoIndex;
      });
      setTodos(newTodos);
    },
  };
};
