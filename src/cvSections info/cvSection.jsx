import { useState } from "react";
import { Input, Button, Accordion, TextArea } from "../utils/reusableIU";
import "./cvSection.css";

// Mock components for demonstration

// function Cvsection({ open, defaultFields, heading, className }) {
//     const [isOpen, setIsOpen] = useState(open);
//     const toggleAccordion = () => setIsOpen(!isOpen);

//     return (
//         <section className={className}>
//             <Accordion
//                 sectionName={heading}
//                 isOpen={isOpen}
//                 onClick={toggleAccordion}
//             />
//             {isOpen && (
//                 <CvsectionFields
//                     defaultFields={defaultFields}
//                     heading={heading}
//                 />
//             )}
//         </section>
//     );
// }

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

function Cvsection({
    open,
    defaultFields,
    heading,
    className,
    cvDataValues,
    setCvDataValues,
    activeCvSection,
    setActiveCvSection,
    index,
    educationSectionFields,
    setEducationSectionFields,
    setUpdatedCvDataValues,
    urlLink,
    setUrlLink,
}) {
    const initialState = {};
    const [dialogValuesObj, setDialogValuesObj] = useState({
        state: false,
        type: "text",
        fieldName: "",
    });
    const [isOpen, setIsOpen] = useState(open);

    const [errorMsgObj, setErrorMsgObj] = useState({ ...initialState });
    const [canSubmit, setCanSubmit] = useState(true);
    const [dynamicFields, setDynamicFields] = useState([]);
    let isCvSectionActive = activeCvSection.index == index;

    const toggleAccordion = (e) => {
        isOpen ? setIsOpen(true) : setIsOpen(!isOpen);
        setActiveCvSection({
            ...activeCvSection,
            name: heading,
            index: e.target.dataset.index,
        });
    };

    const handleDialogType = (e) => {
        setDialogValuesObj({ ...dialogValuesObj, type: e.target.value });
    };

    const handleDialogControl = () => {
        if (activeCvSection.name === "Education Background") {
            let index = 2;
            if (dynamicFields.length) index = dynamicFields.length / 5 + index;
            let inputFields = [
                { name: "Qualification" },
                { name: "Institution" },
                { name: "Start", type: "date" },
                { name: "End", type: "date" },
                { name: "Description", type: "textarea" },
            ];
            let fields = [...dynamicFields];
            setEducationSectionFields([
                ...educationSectionFields,
                educationSectionFields.at(-1) + 1,
            ]);
            for (let i = 0; i < 5; i++) {
                let qualificaton = "Qualification" + index;
                let id = self.crypto.randomUUID();
                if (i === 0) {
                    let field = {
                        ...inputFields[i],
                        id: id,
                        name: qualificaton,
                        placeholder: "Bachelor Of Arts",
                    };
                    fields.push(field);
                    setDynamicFields([...fields]);
                } else {
                    let field = {
                        ...inputFields[i],
                        id: id,
                        name: qualificaton + " " + inputFields[i].name,
                        placeholder:
                            inputFields[i].type === "textarea"
                                ? qualificaton + " " + inputFields[i].name
                                : "Kenyatta University",
                    };
                    fields.push(field);

                    setDynamicFields([...fields]);
                }
            }
        } else {
            setDialogValuesObj({
                state: !dialogValuesObj.state,
                type: "text",
                fieldName: "",
            });
        }
    };

    const handleOnChange = (e) => {
        if (dialogValuesObj.state && e.target.name === "Input Title") {
            // Handle dialog input field name change
            setDialogValuesObj({
                ...dialogValuesObj,
                fieldName: e.target.value,
            });
        } else {
            // Handle regular form field changes
            let { type, name, value, files } = e.target;
            let url = null;

            if (type === "file" && files) {
                url = URL.createObjectURL(files[0]);

                setUrlLink({
                    ...urlLink,
                    [activeCvSection.name]: {
                        ...urlLink[activeCvSection.name],
                        [name]: url,
                    },
                });
            }

            let obj = addFieldToObj(
                cvDataValues[activeCvSection.name],
                type,
                name,
                value
            );

            setCvDataValues({
                ...cvDataValues,
                [activeCvSection.name]: {
                    ...cvDataValues[activeCvSection.name],
                    ...obj,
                },
            });
        }
    };
    console.log(urlLink);
    const handleReset = () => {
        setCvDataValues({ ...cvDataValues, [activeCvSection.name]: {} });
        setErrorMsgObj(initialState);
        setCanSubmit(false);
        setDynamicFields([]);
    };

    const handleAddField = () => {
        if (dialogValuesObj.fieldName.trim() && dialogValuesObj.type) {
            const newField = {
                id: Date.now(),
                name: dialogValuesObj.fieldName.trim(),
                type: dialogValuesObj.type,
                placeholder: `Enter ${dialogValuesObj.fieldName.toLowerCase()}`,
            };

            setDynamicFields([...dynamicFields, newField]);

            // Close dialog and reset values
            setDialogValuesObj({
                state: false,
                type: "text",
                fieldName: "",
            });
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

        if (type === "email") {
            if (value && !emailRegex.test(value)) {
                setErrorMsgObj(
                    addFieldToObj(
                        errorMsgObj,
                        type,
                        name,
                        "Invalid Email Address"
                    )
                );
                setCanSubmit(false);
            } else {
                removeEmptyFields(type, value, name);

                setCanSubmit(true);
            }
        }

        if (type === "tel") {
            if (value && !telRegex.test(value)) {
                setErrorMsgObj(
                    addFieldToObj(
                        errorMsgObj,
                        type,
                        name,
                        "Invalid Phone Number (format: +1234567890)"
                    )
                );
                setCanSubmit(false);
            } else {
                removeEmptyFields(type, value, name);
            }
            setCanSubmit(true);
        }
        if (type !== "tel" || type !== "email") setCanSubmit(true);
    };

    const removeEmptyFields = (type, value, name) => {
        let fieldObj = { ...errorMsgObj };
        if (fieldObj[type]) {
            if (Object.keys(fieldObj[type]).length > 1) {
                delete fieldObj[type][name];
            } else {
                if (Object.keys(fieldObj[type])[0] === name)
                    delete fieldObj[type];
            }
        }
        setErrorMsgObj(fieldObj);
    };

    const handleSubmit = () => {
        if (canSubmit) {
            setCvDataValues({
                ...cvDataValues,
                [activeCvSection.name]: {
                    ...cvDataValues[activeCvSection.name],
                    canUpdate: true,
                },
            });
            setUpdatedCvDataValues({
                ...cvDataValues,
                [activeCvSection.name]: {
                    ...cvDataValues[activeCvSection.name],
                    canUpdate: true,
                },
            });
        }
    };

    return (
        <section className={className}>
            <div className="section-fields-cont">
                <Accordion
                    sectionName={heading}
                    isOpen={isOpen}
                    index={index}
                    isCvSectionActive={isCvSectionActive}
                    onClick={toggleAccordion}
                    cvDataValues={cvDataValues}
                    setCvDataValues={setCvDataValues}
                />
                {isCvSectionActive && isOpen && (
                    <div className="info-fields">
                        <div className="form-container">
                            <div className="input-field">
                                {/* Render default fields */}

                                {defaultFields.map((field) => {
                                    if (field.type === "textarea") {
                                        return (
                                            <TextArea
                                                key={field.id}
                                                cvDataValues={
                                                    cvDataValues[heading]
                                                }
                                                name={field.name}
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
                                            cvDataValues={cvDataValues[heading]}
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
                                                cvDataValues={
                                                    cvDataValues[heading]
                                                }
                                                name={field.name}
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
                                            cvDataValues={cvDataValues[heading]}
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

                            <div className="buttons-container">
                                <button
                                    className="btns"
                                    type="button"
                                    onClick={handleReset}
                                    style={{
                                        title: "Reset Form",
                                    }}
                                >
                                    ↻
                                </button>
                                <button
                                    className="btns"
                                    type="button"
                                    onClick={handleDialogControl}
                                    style={{
                                        color: "var(--moderate-green)",
                                        borderColor: "var(--moderate-green)",
                                        title: "Add Field",
                                    }}
                                >
                                    ➕
                                </button>
                                <button
                                    className="btns"
                                    type="button"
                                    onClick={handleSubmit}
                                    style={{
                                        color:
                                            Object.keys(errorMsgObj).length <
                                                1 && canSubmit
                                                ? "var(--blue)"
                                                : "var(--light-blue)",
                                        borderColor:
                                            Object.keys(errorMsgObj).length <
                                                1 && canSubmit
                                                ? "var(--blue)"
                                                : "var(--light-blue)",
                                        cursor:
                                            Object.keys(errorMsgObj).length <
                                                1 && canSubmit
                                                ? "pointer"
                                                : "not-allowed",
                                        title: "Submit",
                                    }}
                                    disabled={
                                        !Object.keys(errorMsgObj).length > 1
                                    }
                                >
                                    ✓
                                </button>
                            </div>
                        </div>

                        {dialogValuesObj.state &&
                            activeCvSection.name !== "Education Background" && (
                                <div className="dialog-overlay">
                                    <div className="dialog-content">
                                        <div className="select-input-type">
                                            <p>Select input type</p>
                                            <NewInputFieldSelection
                                                handleAddFieldType={
                                                    handleDialogType
                                                }
                                                selectedType={
                                                    dialogValuesObj.type
                                                }
                                            />
                                        </div>
                                        <Input
                                            cvDataValues={cvDataValues}
                                            handleOnchange={handleOnChange}
                                            name="Input Title"
                                            placeholder="e.g., Nationality, Date of Birth"
                                            handleBlur={handleBlur}
                                            isDialog={dialogValuesObj}
                                        />
                                        <div className="buttons-container">
                                            <Button
                                                buttonTitle="Cancel"
                                                bgc="var(--red)"
                                                active="active"
                                                onClick={handleDialogControl}
                                            />
                                            <Button
                                                buttonTitle="Add Field"
                                                bgc="var(--moderate-green)"
                                                active={
                                                    dialogValuesObj.fieldName.trim()
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
                )}
            </div>
        </section>
    );
}

function sectionInfo(infoObj) {
    return infoObj;
}

export { Cvsection as default, sectionInfo };
