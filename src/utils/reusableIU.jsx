import "./reusableIU.css";

// Input Component
const Input = ({
    inputValueObj,
    handleOnchange,
    name,
    defaultType = "text",
    placeholder,
    handleBlur,
    errorMsgObj,
    isDialog,
}) => {
    const value = isDialog
        ? isDialog.fieldName
        : inputValueObj[defaultType]?.[name] || "";
    const error = errorMsgObj?.[defaultType]?.[name];

    return (
        <div className="input-group">
            <label>
                {name}
                <input
                    type={defaultType}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleOnchange}
                    onBlur={handleBlur}
                    style={{
                        border: error ? "2px solid #dc3545" : "1px solid #ccc",
                    }}
                />
                {error && <span>{error}</span>}
            </label>
        </div>
    );
};

// TextArea Component
function TextArea({
    inputValueObj,
    name,
    defaultType,
    handleOnchange,
    placeholder,
}) {
    let value = "";
    if (inputValueObj[defaultType]) {
        value = inputValueObj[defaultType]?.[name] || "";
    }

    return (
        <>
            <label>
                {name}
                <textarea
                    type={defaultType}
                    value={value}
                    name={name}
                    onChange={handleOnchange}
                    placeholder={placeholder}
                ></textarea>
            </label>
        </>
    );
}

// Button Component
const Button = ({ buttonTitle, bgc, active, onClick }) => (
    <button
        style={{
            backgroundColor: bgc,
            opacity: active === "inactive" ? 0.7 : 1,
        }}
        onClick={onClick}
        type="button"
    >
        {buttonTitle}
    </button>
);

// Arccodion Component
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
