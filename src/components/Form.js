import React, { useState } from "react";


function Form(props) {

    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if(name === "") {
            alert("Please enter what needs to be done before adding it")
        }
        else {
            props.addTask(name);
            setName("");
        }
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    const TitleIcon = props.icon;

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <TitleIcon fontSize="25px"/>
                <label htmlFor="new-todo-input">
                {props.title}
                </label>
            </h2>
            <span>
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
            </span>
      </form>
    );
}

export default Form;