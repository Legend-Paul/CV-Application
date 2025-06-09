import React, { useState } from "react";
import "./reusableIU.css";

function Input({ inputTitle, type }) {
    const [value, setValue] = useState("");
    return (
        <>
            <label>
                {inputTitle}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
        </>
    );
}
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

export { Input, TextArea };
