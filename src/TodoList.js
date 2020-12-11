import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTodos,deleteTodo } from "./api";

export const TodoList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const todos = await getTodos();
      setItems(todos);
    };
    fetchItems();
  }, []);

  const deleteByid = async(id)=>{
    console.log('id',id);
    await deleteTodo(id);
  }

  return (
    <div className="coontainer">
      <div className="mt-3">
        <h3>Todo List</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Text</th>
              <th>ActionEdit</th>
              <th>ActionDelete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((todo) => (
              <tr key={todo._id}>
                <td>{todo.text}</td>
                <td>
                  <Link to={`/edit/${todo._id}`}>Edit</Link>
                </td>
                <td>
                  <Link  onClick={()=> deleteByid(todo._id)}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
