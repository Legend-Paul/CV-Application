import PersonalInfo from "./personal info/personalInfo";
import Header from "./header/header";
import Education from "./education/education";
import "./App.css";
import "./index.css";
function App() {
    let personalInfoDate = [
        { name: "Full Name", type: "text", placeholder: "Maina Paul" },
        {
            name: "Email Adress",
            type: "email",
            placeholder: "example@gmail.com",
        },
        { name: "Phone Number", type: "tel", placeholder: "+254712345678" },
        { name: "Postal Adress", type: "text", placeholder: "" },
    ];
    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <PersonalInfo
                    defaultFields={personalInfoDate}
                    heading="Personal Information"
                />
                <Education />
            </main>
        </div>
    );
}
export default App;
