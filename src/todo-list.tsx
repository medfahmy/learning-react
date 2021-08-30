import React, { Reducer, useReducer, useState } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface State {
  todos: Todo[];
  todoCount: number;
}

export const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

enum ActionType {
  ADD_TODO = "ADD_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
}

// actions
interface AddTodoAction {
  type: ActionType.ADD_TODO;
  payload: {
    text: string;
  };
}

interface ToggleTodoAction {
  type: ActionType.TOGGLE_TODO;
  payload: {
    id: string;
  };
}

// union of actions
type Action = AddTodoAction | ToggleTodoAction;

// action creators
const addTodo = function (text: string): AddTodoAction {
  return {
    type: ActionType.ADD_TODO,
    payload: { text },
  };
};

const toggleTodo = function (id: string): ToggleTodoAction {
  return {
    type: ActionType.TOGGLE_TODO,
    payload: { id },
  };
};

// reducer
const reducer: Reducer<State, Action> = function (state, action) {
  switch (action.type) {
    case ActionType.ADD_TODO:
      const newTodo = {
        id: randomId(),
        text: action.payload.text,
        done: false,
      };
      return {
        todos: [...state.todos, newTodo],
        todoCount: state.todoCount + 1,
      };

    case ActionType.TOGGLE_TODO:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
        ),
        todoCount: state.todoCount,
      };

    default:
      return state;
  }
};

export const TodoList: React.FC = function () {
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, {
    todos: [],
    todoCount: 0,
  });
  const [text, setText] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addTodo(text));
          setText("");
          console.log(addTodo(text));
        }}
      >
        <input
          placeholder="todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>

      <h3>number of todos : {todoCount}</h3>

      {todos.map(({ id, text, done }) => (
        <h3
          key={id}
          onClick={() => dispatch(toggleTodo(id))}
          style={{ textDecoration: done ? "line-through" : "" }}
        >
          - {text}
        </h3>
      ))}
    </div>
  );
};
