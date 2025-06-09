import React, { useState } from "react";
import "./reusableIU.css";

// Input Componetc
function Input({ inputTitle, defaultType = "text", placeholder }) {
    const [value, setValue] = useState("");
    return (
        <>
            <label>
                {inputTitle}
                <input
                    type={defaultType}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                />
            </label>
        </>
    );
}

// TextArea Component
function TextArea({ textareaTitle }) {
    const [value, setValue] = useState("");
    return (
        <>
            <label>
                {textareaTitle}
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
            </label>
        </>
    );
}

// Button Component
function Button({ buttonTitle, bgc, onClick }) {
    return (
        <button
            className="button"
            style={{ backgroundColor: bgc }}
            onClick={onClick}
        >
            {buttonTitle}
        </button>
    );
}

// Arccodion Componenet
function Accordion({ sectionName, isOpen, onClick }) {
    return (
        <div className="pannel" onClick={onClick}>
            <h2>{sectionName}</h2>
            {isOpen ? (
                <i className="bi bi-chevron-down"></i>
            ) : (
                <i className="bi bi-chevron-right"></i>
            )}
        </div>
    );
}

export { Input, TextArea, Button, Accordion };
