import React from "react";

function FilterButton(props) {
    return (
        // Here, aria-pressed tells assistive technology (like screen readers) that the button can be in one of two states: pressed or unpressed. 
        // Think of these as analogs for on and off. Setting a value of true means that the button is pressed by default.
        <button 
            type="button" 
            className="btn toggle-btn" 
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}    
        >
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;