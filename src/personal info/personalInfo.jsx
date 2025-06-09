import { useState } from "react";

import { Input, Button, Accordion } from "../utils/reusableIU";
import "./personalInfo.css";
import "../index.css";

function PersonalInfo() {
    const [isOpen, setIsOpen] = useState(true);
    const [addField, setAddField] = useState("");
    const toggleAccordion = () => setIsOpen(!isOpen);
    const hadleAddField = (e) => {
        console.log(e.target.value);
        setAddField(e.target.value);
    };

    return (
        <section className="personal-info">
            <Accordion
                sectionName={"Personal Information"}
                isOpen={isOpen}
                onClick={toggleAccordion}
            />
            {isOpen && (
                <PersonalInfoFields
                    addField={addField}
                    hadleAddField={hadleAddField}
                />
            )}
        </section>
    );
}

function NewInputField({ hadleAddField }) {
    return (
        <select onChange={hadleAddField}>
            <option disabled selected>
                Add New Field
            </option>
            <option value="text"> Text Field</option>
            <option value="email"> Email Field</option>
            <option value="date"> Date Field</option>
            <option value="number"> Number Field</option>
            <option value="tel"> Tel Filed</option>
        </select>
    );
}

function PersonalInfoFields({ addField, hadleAddField }) {
    return (
        <div className="info-fields">
            <div className="input-field">
                <Input inputTitle="Name" />
                <Input inputTitle="Email" type={"email"} />
                <Input inputTitle="Phone" type={"tel"} />
                <Input inputTitle="Address" type={"text"} />
                {addField && <Input inputTitle="Email" type={"email"} />}
            </div>
            <div className="buttons-container">
                <NewInputField hadleAddField={hadleAddField} />
                <Button
                    buttonTitle="Save Details"
                    bgc={"var(--blue)"}
                    onClick={() => {
                        console.log("Add button clicked");
                    }}
                />
            </div>
        </div>
    );
}

export default PersonalInfo;
