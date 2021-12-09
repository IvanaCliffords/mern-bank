// import React, { useState, useContext, useEffect } from 'react';
// import { CredentialsContext } from '../App';
// import { v4 as uuidv4 } from 'uuid';

// function Todos() {
//   const [todos, setTodos] = useState([]);
//   const [todoText, setTodoText] = useState('');
//   const [credentials] = useContext(CredentialsContext);
//   const [filter, setFilter] = useState('uncompleted');

//   const persist = (newTodos) => {
//     fetch(`http://localhost:4000/todos`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Basic ${credentials.email}:${credentials.password}`,
//       },
//       body: JSON.stringify(newTodos),
//     }).then(() => {});
//   };

//   useEffect(() => {
//     fetch(`http://localhost:4000/todos`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Basic ${credentials.email}:${credentials.password}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((todos) => setTodos(todos));
//   }, [credentials.email, credentials.password]);

//   const addTodo = (e) => {
//     e.preventDefault();
//     // prevent empty tasks
//     if (!todoText) return;
//     // create a new todo
//     const newTodo = { id: uuidv4(), checked: false, text: todoText };
//     const newTodos = [...todos, newTodo];
//     setTodos(newTodos);
//     setTodoText('');
//     persist(newTodos);
//   };

//   const toggleTodo = (id) => {
//     // get all todos
//     const newTodoList = [...todos];
//     // toggle opposite checked value
//     const todoItem = newTodoList.find((todo) => todo.id === id);
//     console.log(todoItem);
//     todoItem.checked = !todoItem.checked;
//     setTodos(newTodoList);
//     persist(newTodoList);
//   };

//   const getTodos = () => {
//     // if filter is marked as completed than return only one's that are checked
//     return todos.filter((todo) =>
//       filter === 'completed' ? todo.checked : !todo.checked
//     );
//   };

//   const changeFilter = (newFilter) => {
//     setFilter(newFilter);
//   };

//   return (
//     <div>
//       <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
//         <option value="completed">Completed</option>
//         <option value="uncompleted">Uncomplete</option>
//       </select>

//       {getTodos().map((todo) => (
//         <div key={todo.id}>
//           <input
//             checked={todo.checked}
//             onChange={() => toggleTodo(todo.id)}
//             type="checkbox"
//           />
//           <label>{todo.text}</label>
//         </div>
//       ))}
//       <br />
//       <form onSubmit={addTodo}>
//         <input
//           type="text"
//           value={todoText}
//           onChange={(e) => setTodoText(e.target.value)}
//         />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// }

// export default Todos;
