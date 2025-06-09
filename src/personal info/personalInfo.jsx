import { Input, TextArea } from "../utils/inputFields";
import "./personalInfo.css";

function PersonalInfo() {
    return (
        <div className="personal-info">
            <h2>Personal Information</h2>
            <Input inputTitle="Name" />
            <Input inputTitle="Email" />
            <TextArea textareaTitle="Bio" />
        </div>
    );
}

export default PersonalInfo;
