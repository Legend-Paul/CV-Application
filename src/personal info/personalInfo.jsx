import { useState } from "react";

import { Input, Button, Accordion } from "../utils/reusableIU";
import "./personalInfo.css";
import "../index.css";

function PersonalInfo() {
    const [isOpen, setIsOpen] = useState(true);
    const toggleAccordion = () => setIsOpen(!isOpen);
    return (
        <section className="personal-info">
            <Accordion
                sectionName={"Personal Information"}
                isOpen={isOpen}
                onClick={toggleAccordion}
            />
            {isOpen && <PersonalInfoFields />}
        </section>
    );
}

function PersonalInfoFields() {
    const addNewField = () => {};
    return (
        <div className="info-fields">
            <div className="input-field">
                <Input inputTitle="Name" type={"text"} />
                <Input inputTitle="Email" type={"email"} />
                <Input inputTitle="Phone" type={"tel"} />
                <Input inputTitle="Address" type={"text"} />
            </div>
            <div className="buttons-container">
                <Button
                    buttonTitle="Add New Field"
                    bgc={"var(--moderate-green)"}
                    onClick={addNewField}
                />
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
