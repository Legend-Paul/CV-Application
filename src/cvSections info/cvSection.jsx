import { useState } from "react";
import { Input, Button, Accordion, TextArea } from "../utils/reusableIU";
import "./cvSection.css";

function NewInputFieldSelection({ handleAddFieldType, selectedType }) {
    return (
        <select
            onChange={handleAddFieldType}
            value={selectedType}
            style={{ padding: "8px", width: "100%", borderRadius: "4px" }}
        >
            <option data-link="" value="text">
                Text Field
            </option>
            <option data-link="isLink" value="text">
                Link Field
            </option>
            <option data-link="" value="email">
                Email Field
            </option>
            <option data-link="" value="date">
                Date Field
            </option>
            <option data-link="" value="number">
                Number Field
            </option>
            <option data-link="" value="tel">
                Tel Field
            </option>
            <option data-link="" value="textarea">
                Textarea Field
            </option>
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
    knowldedgeSectionFields,
    setKnowldedgeSectionFields,
    urlLink,
    setUrlLink,
    addsSimalarFields,
    setUpdatedCvDataValues,
    canSubmit,
    setCanSubmit,
    handleSubmit,
    errorMsgObj,
    setErrorMsgObj,
    dynamicFields,
    setDynamicFields,
}) {
    const initialState = {};
    const [dialogValuesObj, setDialogValuesObj] = useState({
        state: false,
        type: "text",
        fieldName: "",
    });
    const [isOpen, setIsOpen] = useState(open);

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
        // Get the selected <option> element
        const selectedOption = e.target.options[e.target.selectedIndex];
        const link = selectedOption.dataset.link;

        setDialogValuesObj({
            ...dialogValuesObj,
            type: e.target.value,
            link: link,
        });
    };

    const handleDialogControl = () => {
        if (addsSimalarFields) {
            let index = 2;
            if (dynamicFields.length)
                index = dynamicFields.length / defaultFields.length + index;

            let fields = [...dynamicFields];
            setKnowldedgeSectionFields({
                ...knowldedgeSectionFields,
                [activeCvSection.name]: [
                    ...knowldedgeSectionFields[activeCvSection.name],
                    knowldedgeSectionFields[activeCvSection.name].at(-1) + 1,
                ],
            });

            defaultFields.map((field) => {
                let id = self.crypto.randomUUID();
                let name = field.name
                    .split(" ")
                    .map((word, i) => {
                        return i === 0 ? word.slice(0, -1) + index : word;
                    })
                    .join(" ");
                let placeholder = field.placeholder
                    ? field.placeholder
                    : "Enter " + name.toLowerCase() + index;
                fields.push({
                    ...field,
                    id: id,
                    name: name,
                    placeholder: placeholder,
                });
                return field;
            });
            setDynamicFields([...fields]);
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
            const errorText = document.querySelector(".error-text");
            errorText.style.display = "none";
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

    const handleReset = () => {
        setCvDataValues({ ...cvDataValues, [activeCvSection.name]: {} });
        setUpdatedCvDataValues({});
        setErrorMsgObj(initialState);
        setCanSubmit(true);
        setDynamicFields([]);
    };

    const handleAddField = () => {
        if (dialogValuesObj.fieldName.trim() && dialogValuesObj.type) {
            const name = dialogValuesObj.fieldName.trim();
            const type = dialogValuesObj.type;

            const errorText = document.querySelector(".error-text");

            const newField = {
                id: Date.now(),
                name,
                type,
                placeholder: `Enter ${dialogValuesObj.fieldName.toLowerCase()}`,
                isLink: dialogValuesObj.link || "",
            };
            const defaultDataHasField = defaultFields.some(
                (defaultName) =>
                    defaultName.name.toLowerCase() === name.toLowerCase()
            );

            const hasType = dynamicFields.some(
                (field) => field.name.toLowerCase() === name.toLowerCase()
            );

            switch (defaultDataHasField) {
                case false:
                    switch (hasType) {
                        case false:
                            errorText.style.display = "none";
                            setDynamicFields([...dynamicFields, newField]);
                            setDialogValuesObj({
                                state: false,
                                type: "text",
                                fieldName: "",
                            });
                            break;

                        case true:
                            errorText.style.display = "block";
                            break;
                    }
                    break;
                case true:
                    errorText.style.display = "block";
                    break;
            }

            // Close dialog and reset values
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
        const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;

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
                removeEmptyFields(type, name, true);

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
                removeEmptyFields(type, name, true);
            }
            setCanSubmit(true);
        }
        if (e.target.dataset.link) {
            if (value && !urlRegex.test(value)) {
                setErrorMsgObj(
                    addFieldToObj(
                        errorMsgObj,
                        type,
                        name,
                        "Invalid URL (format: http:// or https://)"
                    )
                );
                setCanSubmit(false);
            } else {
                setUrlLink({
                    ...urlLink,
                    [activeCvSection.name]: {
                        ...urlLink[activeCvSection.name],
                        [name]: value,
                    },
                });

                setCanSubmit(true);

                removeEmptyFields(type, name, true);
            }
        } else if (
            type !== "tel" ||
            (type !== "email" && !e.target.dataset.link)
        )
            setCanSubmit(true);
        if (!value) removeEmptyFields(type, name, false);
    };

    const removeEmptyFields = (type, name, isError) => {
        let fieldObj = {};
        isError
            ? (fieldObj = { ...errorMsgObj })
            : (fieldObj = { ...cvDataValues });
        isError
            ? checkEmptyField(fieldObj, type, name)
            : checkEmptyField(fieldObj[activeCvSection.name], type, name);

        isError ? setErrorMsgObj(fieldObj) : setCvDataValues(fieldObj);
    };

    const checkEmptyField = (fieldObj, type, name) => {
        if (fieldObj[type]) {
            if (Object.keys(fieldObj[type]).length > 1) {
                delete fieldObj[type][name];
            } else {
                if (Object.keys(fieldObj[type])[0] === name)
                    delete fieldObj[type];
            }
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
                    setKnowldedgeSectionFields={setKnowldedgeSectionFields}
                    knowldedgeSectionFields={knowldedgeSectionFields}
                    addsSimalarFields={addsSimalarFields}
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
                                            isLink={field.isLink}
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
                                            isLink={field.isLink}
                                        />
                                    );
                                })}
                            </div>

                            <div className="buttons-container">
                                <div className="btn-cont reset-fields-btn">
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
                                    <p>Reset Fields</p>
                                </div>

                                <div className="btn-cont add-field-btn">
                                    <button
                                        className="btns"
                                        type="button"
                                        onClick={handleDialogControl}
                                        style={{
                                            color: "var(--moderate-green)",
                                            borderColor:
                                                "var(--moderate-green)",
                                            title: "Add Field",
                                        }}
                                    >
                                        ➕
                                    </button>
                                    <p>Add Field</p>
                                </div>
                                <div className="btn-cont save-fields-btn">
                                    <button
                                        className="btns"
                                        type="button"
                                        onClick={handleSubmit}
                                        style={{
                                            color:
                                                Object.keys(errorMsgObj)
                                                    .length < 1 && canSubmit
                                                    ? "var(--blue)"
                                                    : "var(--light-blue)",
                                            borderColor:
                                                Object.keys(errorMsgObj)
                                                    .length < 1 && canSubmit
                                                    ? "var(--blue)"
                                                    : "var(--light-blue)",
                                            cursor:
                                                Object.keys(errorMsgObj)
                                                    .length < 1 && canSubmit
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
                                    <p>Save Changes</p>
                                </div>
                            </div>
                        </div>

                        {dialogValuesObj.state &&
                            activeCvSection.name !== "Education Background" && (
                                <div className="dialog-overlay">
                                    <div className="dialog-content">
                                        <div className="select-input-type">
                                            <p className="error-text">
                                                Field already exist
                                            </p>
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
