import React, { Fragment, useState } from 'react';
import { JsxEmit, setTokenSourceMapRange } from 'typescript';
import './App.css';

// Type is equal to a type
type FormElem = React.FormEvent<HTMLFormElement>;

// Interface creates a completely new type
interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

// Extend an interface
// interface ITodo2 extends ITodo {
//   tags: string[]
// }

const App = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [edit, setEdit] = useState<boolean>(false);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string): void => {
    let todoID = 0;
    todoID++;
    const newTodos: ITodo[] = [...todos, { id: todoID, text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    // [0,1,2,3].splice(2,1) = [0,1,3]
    // [0,1,2,3].splice(2,2) = [0,1]
    setTodos(newTodos);
  };

  const updateTodo = (index: number) => {
    const newTodos: ITodo[] = [...todos];

    newTodos.map((t: ITodo) => {
      if (t.id === newTodos[index].id) {
        setEdit(!edit);
      }
    });

    console.log(edit);
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type='submit'>Add Task</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <Fragment key={index}>
            <div
              key={index}
              style={{ textDecoration: todo.complete ? 'line-through' : '' }}
              onClick={() => updateTodo(index)}
            >
              {edit ? <input value={todo.text} /> : todo.text}
            </div>
            <button type='button' onClick={() => completeTodo(index)}>
              {todo.complete ? 'Incomplete' : 'Complete'}
            </button>
            <button type='button' onClick={() => removeTodo(index)}>
              x
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
};

export default App;
