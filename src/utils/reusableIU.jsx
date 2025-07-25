import { useEffect } from "react";
import "./reusableIU.css";

// Input Component
const Input = ({
    cvDataValues,
    handleOnchange,
    name,
    defaultType = "text",
    placeholder,
    handleBlur,
    errorMsgObj,
    isDialog,
    isLink = "",
}) => {
    const value =
        defaultType === "file"
            ? undefined // Do not set value for file inputs
            : isDialog
            ? isDialog.fieldName
            : cvDataValues[defaultType]?.[name] || "";
    const error = errorMsgObj?.[defaultType]?.[name];

    const fileName =
        defaultType === "file" && cvDataValues[defaultType]?.[name]
            ? cvDataValues[defaultType][name].split("\\").pop() // Extract file name
            : "No file chosen";

    return (
        <div className="input-group">
            <label>
                {name}
                <input
                    data-link={isLink}
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
                {defaultType === "file" && (
                    <span className="file-name">{fileName}</span>
                )}
                {error && <span>{error}</span>}
            </label>
        </div>
    );
};
// TextArea Component
function TextArea({
    cvDataValues,
    name,
    defaultType,
    handleOnchange,
    handleBlur,
    placeholder,
}) {
    let value = "";
    if (cvDataValues[defaultType]) {
        value = cvDataValues[defaultType]?.[name] || "";
    }

    return (
        <>
            <label className="textarea-label">
                {name}
                <textarea
                    type={defaultType}
                    value={value}
                    name={name}
                    onChange={handleOnchange}
                    onBlur={handleBlur}
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
function Accordion({
    sectionName,
    isOpen,
    index,
    isCvSectionActive,
    onClick,
    cvDataValues,
    setCvDataValues,
    setKnowldedgeSectionFields,
    knowldedgeSectionFields,
    addsSimalarFields,
}) {
    useEffect(() => {
        if (!cvDataValues[sectionName]) {
            setCvDataValues((prevValues) => ({
                ...prevValues,
                [sectionName]: { canUpdate: false },
            }));
        }
    }, [cvDataValues, sectionName, setCvDataValues]);

    useEffect(() => {
        if (!knowldedgeSectionFields[sectionName] && addsSimalarFields)
            setKnowldedgeSectionFields({
                ...knowldedgeSectionFields,
                [sectionName]: [1],
            });
    }, [
        knowldedgeSectionFields,
        sectionName,
        setKnowldedgeSectionFields,
        addsSimalarFields,
    ]);

    return (
        <div className="pannel" data-index={index} onClick={onClick}>
            <h2>{sectionName}</h2>
            {isCvSectionActive && isOpen ? (
                <i className="bi bi-chevron-down"></i>
            ) : (
                <i className="bi bi-chevron-right"></i>
            )}
        </div>
    );
}

export { Input, TextArea, Button, Accordion };
