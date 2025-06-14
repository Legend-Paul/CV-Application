import { useState } from "react";

import { Input, TextArea, Button, Accordion } from "../utils/reusableIU";
import "./education.css";
import "../index.css";

function Education() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => setIsOpen(!isOpen);
    return (
        <section>
            <Accordion
                sectionName={"Education Background"}
                isOpen={isOpen}
                onClick={toggleAccordion}
            />
            {isOpen && <EducationInputField />}
        </section>
    );
}

function EducationInputField() {
    const [addField, setAddField] = useState("");
    let initialState = {};
    const [inputValueObj, setinputValueObj] = useState(initialState);
    const [errorMsgObj, setErrorMsgObj] = useState(initialState);
    const [previosBlur, setPreviousBlur] = useState(initialState);
    const [canSubmit, setCanSubmit] = useState(false);

    const handleOnchange = (e) => {
        const { type, name, value } = e.target;
        setinputValueObj(addFieldToObj(inputValueObj, type, name, value));
        removeErroMsg();
        setCanSubmit(true);
        console.log(value);
    };
    console.log(inputValueObj);
    const handleReset = () => {
        setinputValueObj(initialState);
        setErrorMsgObj(initialState);
        setPreviousBlur(initialState);
    };
    const handleSubmit = () => {};
    const removeErroMsg = () => {
        if (previosBlur) {
            let stateObj = { ...errorMsgObj };
            setErrorMsgObj(
                addFieldToObj(stateObj, previosBlur.type, previosBlur.name, "")
            );
        }
    };

    const addFieldToObj = (stateObj, type, name, value) => {
        setCanSubmit(false);
        return {
            ...stateObj,
            [type]: { ...stateObj[type], [name]: value },
        };
    };

    const handleBlur = (e) => {
        const { type, name, value } = e.target;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        let telRegex = /^\+\d{1,3}\d{9}$/i;
        if (type === "email") {
            if (value && !emailRegex.test(value)) {
                setErrorMsgObj(
                    addFieldToObj(
                        errorMsgObj,
                        type,
                        name,
                        "Invalid Email Adress"
                    )
                );
            }
            setPreviousBlur({ type: type, name: name });
        }
        if (type === "tel") {
            if (value && !telRegex.test(value)) {
                if (!emailRegex.test(value)) {
                    setErrorMsgObj(
                        addFieldToObj(
                            errorMsgObj,
                            type,
                            name,
                            "Invalid Phone Number"
                        )
                    );
                }
                setPreviousBlur({ type: type, name: name });
            }
        }
    };

    const hadleAddField = (e) => {
        setAddField(e.target.value);
    };
    return (
        <div className="info-fields">
            <Input
                inputValueObj={inputValueObj}
                handleOnchange={handleOnchange}
                name={"Qualification"}
                placeholder={"Bachelor Of Arts"}
                handleBlur={handleBlur}
                errorMsgObj={errorMsgObj}
            />
            <Input
                inputValueObj={inputValueObj}
                handleOnchange={handleOnchange}
                name={"Institution"}
                placeholder={"Kenyatta University"}
                handleBlur={handleBlur}
                errorMsgObj={errorMsgObj}
            />
            <p>Learning Period</p>
            <div className="learning-period">
                <Input
                    inputValueObj={inputValueObj}
                    handleOnchange={handleOnchange}
                    name={"Start"}
                    defaultType="date"
                    placeholder={"2020-2025"}
                    handleBlur={handleBlur}
                    errorMsgObj={errorMsgObj}
                />
                <Input
                    inputValueObj={inputValueObj}
                    handleOnchange={handleOnchange}
                    name={"End"}
                    defaultType="date"
                    placeholder={"2020-2025"}
                    handleBlur={handleBlur}
                    errorMsgObj={errorMsgObj}
                />
            </div>

            <TextArea
                inputValueObj={inputValueObj}
                name={"Description"}
                defaultType="textarea"
                handleOnchange={handleOnchange}
                placeholder={"Qualification description"}
            />
            <div className="buttons-container">
                {/* <NewInputFieldSelection hadleAddField={hadleAddField} /> */}
                <Button
                    buttonTitle="Reset Details"
                    bgc={"var(--red)"}
                    onClick={handleReset}
                    type="reset"
                />
                {canSubmit ? (
                    <Button
                        buttonTitle="Save Details"
                        bgc={"var(--blue)"}
                        onClick={handleSubmit}
                    />
                ) : (
                    <Button
                        buttonTitle="Save Details"
                        bgc={"var(--light-blue)"}
                        active="inactive"
                    />
                )}
            </div>
        </div>
    );
}

export default Education;
