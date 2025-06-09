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
    return (
        <div className="info-fields">
            <Input
                inputTitle={"Qualification"}
                placeholder={"Bachelor Of Arts"}
            />
            <Input
                inputTitle={"Institution"}
                placeholder={"Kenyatta University"}
            />
            <Input
                inputTitle={"Period"}
                type="date"
                placeholder={"2020-2025"}
            />
            <TextArea textareaTitle={"Description"} />
        </div>
    );
}

export default Education;
