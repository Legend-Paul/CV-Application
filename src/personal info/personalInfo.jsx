import { useState } from "react";
import { Input, Button, Accordion, TextArea } from "../utils/reusableIU";
import "./personalInfo.css";

// Mock components for demonstration

function PersonalInfo({ defaultFields, heading }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <section className="personal-info">
            <Accordion
                sectionName={heading}
                isOpen={isOpen}
                onClick={toggleAccordion}
            />
            {isOpen && (
                <PersonalInfoFields
                    defaultFields={defaultFields}
                    heading={heading}
                />
            )}
        </section>
    );
}

function NewInputFieldSelection({ handleAddFieldType, selectedType }) {
    return (
        <select
            onChange={handleAddFieldType}
            value={selectedType}
            style={{ padding: "8px", width: "100%", borderRadius: "4px" }}
        >
            <option value="text">Text Field</option>
            <option value="email">Email Field</option>
            <option value="date">Date Field</option>
            <option value="number">Number Field</option>
            <option value="tel">Tel Field</option>
            <option value="textarea">Textarea Field</option>
        </select>
    );
}

function PersonalInfoFields({ defaultFields }) {
    const initialState = {};
    const [dialogValues, setDialogValues] = useState({
        state: false,
        type: "text",
        fieldName: "",
    });
    const [inputValueObj, setInputValueObj] = useState({ ...initialState });
    const [errorMsgObj, setErrorMsgObj] = useState({ ...initialState });
    const [previousBlur, setPreviousBlur] = useState({ ...initialState });
    const [canSubmit, setCanSubmit] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);

    const handleDialogType = (e) => {
        setDialogValues({ ...dialogValues, type: e.target.value });
    };

    const handleDialogControl = () => {
        setDialogValues({
            state: !dialogValues.state,
            type: "text",
            fieldName: "",
        });
    };

    const handleOnChange = (e) => {
        if (dialogValues.state && e.target.name === "Input Title") {
            // Handle dialog input field name change
            setDialogValues({ ...dialogValues, fieldName: e.target.value });
        } else {
            // Handle regular form field changes
            const { type, name, value } = e.target;
            setInputValueObj(addFieldToObj(inputValueObj, type, name, value));
            removeErrorMsg();
            setCanSubmit(true);
        }
    };

    const handleReset = () => {
        setInputValueObj(initialState);
        setErrorMsgObj(initialState);
        setPreviousBlur(initialState);
        setCanSubmit(false);
    };

    const handleAddField = () => {
        if (dialogValues.fieldName.trim() && dialogValues.type) {
            const newField = {
                id: Date.now(),
                name: dialogValues.fieldName.trim(),
                type: dialogValues.type,
                placeholder: `Enter ${dialogValues.fieldName.toLowerCase()}`,
            };

            setDynamicFields([...dynamicFields, newField]);

            // Close dialog and reset values
            setDialogValues({
                state: false,
                type: "text",
                fieldName: "",
            });
        }
    };

    const removeErrorMsg = () => {
        if (previousBlur.type && previousBlur.name) {
            let stateObj = { ...errorMsgObj };
            setErrorMsgObj(
                addFieldToObj(
                    stateObj,
                    previousBlur.type,
                    previousBlur.name,
                    ""
                )
            );
        }
    };

    const addFieldToObj = (stateObj, type, name, value) => {
        return {
            ...stateObj,
            [type]: { ...stateObj[type], [name]: value },
        };
    };

    const handleBlur = (e) => {
        const { type, name, value } = e.target;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        const telRegex = /^\+\d{1,3}\d{9}$/;

        if (type === "email" && value) {
            if (!emailRegex.test(value)) {
                setErrorMsgObj(
                    addFieldToObj(
                        errorMsgObj,
                        type,
                        name,
                        "Invalid Email Address"
                    )
                );
            }
            setPreviousBlur({ type, name });
        }

        if (type === "tel" && value) {
            if (!telRegex.test(value)) {
                setErrorMsgObj(
                    addFieldToObj(
                        errorMsgObj,
                        type,
                        name,
                        "Invalid Phone Number (format: +1234567890)"
                    )
                );
            }
            setPreviousBlur({ type, name });
        }
    };

    const handleSubmit = () => {
        if (canSubmit) {
            alert("Form submitted successfully!");
        }
    };

    return (
        <div
            className="info-fields"
            style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
        >
            <div className="form-container">
                <div className="input-field">
                    {/* Render default fields */}
                    {console.log(defaultFields)}
                    {defaultFields.map((field) => {
                        if (field.type === "textarea") {
                            return (
                                <TextArea
                                    key={field.id}
                                    inputValueObj={inputValueObj}
                                    name={"Description"}
                                    defaultType="textarea"
                                    handleOnchange={handleOnChange}
                                    placeholder={field.placeholder}
                                    handleBlur={handleBlur}
                                    errorMsgObj={errorMsgObj}
                                />
                            );
                        }
                        return (
                            <Input
                                key={field.id}
                                inputValueObj={inputValueObj}
                                handleOnchange={handleOnChange}
                                name={field.name}
                                defaultType={field.type}
                                placeholder={field.placeholder}
                                handleBlur={handleBlur}
                                errorMsgObj={errorMsgObj}
                            />
                        );
                    })}
                    {/* Render dynamic fields */}
                    {dynamicFields.map((field) => {
                        if (field.type === "textarea") {
                            return (
                                <TextArea
                                    key={field.id}
                                    inputValueObj={inputValueObj}
                                    name={"Description"}
                                    defaultType="textarea"
                                    handleOnchange={handleOnChange}
                                    placeholder={field.placeholder}
                                    handleBlur={handleBlur}
                                    errorMsgObj={errorMsgObj}
                                />
                            );
                        }
                        return (
                            <Input
                                key={field.id}
                                inputValueObj={inputValueObj}
                                handleOnchange={handleOnChange}
                                name={field.name}
                                defaultType={field.type}
                                placeholder={field.placeholder}
                                handleBlur={handleBlur}
                                errorMsgObj={errorMsgObj}
                            />
                        );
                    })}
                </div>

                <div
                    className="buttons-container"
                    style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                    <button
                        type="button"
                        onClick={handleReset}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            color: "#dc3545",
                            cursor: "pointer",
                            title: "Reset Form",
                        }}
                    >
                        ↻
                    </button>
                    <button
                        type="button"
                        onClick={handleDialogControl}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            color: "#28a745",
                            cursor: "pointer",
                            title: "Add Field",
                        }}
                    >
                        ➕
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            color: canSubmit ? "#007bff" : "#6c757d",
                            cursor: canSubmit ? "pointer" : "not-allowed",
                            title: "Submit",
                        }}
                        disabled={!canSubmit}
                    >
                        ✓
                    </button>
                </div>
            </div>

            {dialogValues.state && (
                <div
                    className="dialog-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        className="dialog-content"
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            minWidth: "300px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                    >
                        <div
                            className="select-input-type"
                            style={{ marginBottom: "15px" }}
                        >
                            <p
                                style={{
                                    margin: "0 0 10px 0",
                                    fontWeight: "bold",
                                }}
                            >
                                Select input type
                            </p>
                            <NewInputFieldSelection
                                handleAddFieldType={handleDialogType}
                                selectedType={dialogValues.type}
                            />
                        </div>
                        <Input
                            inputValueObj={inputValueObj}
                            handleOnchange={handleOnChange}
                            name="Input Title"
                            placeholder="e.g., Nationality, Date of Birth"
                            handleBlur={handleBlur}
                            isDialog={dialogValues}
                        />
                        <div
                            className="buttons-container"
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "20px",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                buttonTitle="Cancel"
                                bgc="#dc3545"
                                active="active"
                                onClick={handleDialogControl}
                            />
                            <Button
                                buttonTitle="Add Field"
                                bgc="#28a745"
                                active={
                                    dialogValues.fieldName.trim()
                                        ? "active"
                                        : "inactive"
                                }
                                onClick={handleAddField}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PersonalInfo;
