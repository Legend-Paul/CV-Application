import { Input, TextArea } from "../utils/reusableIU";
import "./personalInfo.css";
import "../index.css";

function PersonalInfo() {
    return (
        <section className="personal-info">
            <h2>Personal Information</h2>
            <div className="input-fiel">
                <Input inputTitle="Name" type={"text"} />
                <Input inputTitle="Email" type={"email"} />
                <Input inputTitle="Phone" type={"tel"} />
                <Input inputTitle="Address" type={"text"} />
            </div>
        </section>
    );
}

export default PersonalInfo;
