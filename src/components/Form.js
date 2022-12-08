import React, { useState } from "react";


function Form(props) {

    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // if(name === "") {
        //     alert("Please enter what needs to be done before adding it")
        // }
        // else {
            props.addTask(name);
            setName("");
        // }
    }

    function handleChange(e) {
        setName(e.target.value);
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__small">
                {props.title}
            </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary">
            Add
            </button>
      </form>
    );
}

export default Form;