import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export const TodoForm = ({ todo, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { text: todo ? todo.text : "" },
  });
  const history = useHistory();

  const onSubmitHandler = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="text">Text:</label>
        <input
          className="form-control"
          ref={register}
          type="text"
          name="text"
          id="text"
        />
      </div>
      <div className="from-group">
        <button className="btn btn-primary" type="submit">
          Save Todo
        </button>
      </div>
    </form>
  );
};
