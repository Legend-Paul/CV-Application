import Cvsection from "./personal info/cvSection";
import Header from "./header/header";
import Education from "./education/education";
import "./App.css";
import "./index.css";
function App() {
    let personalInfoDate = [
        {
            id: Date.now() + "1",
            name: "Full Name",
            type: "text",
            placeholder: "Maina Paul",
        },
        {
            id: Date.now() + "2",
            name: "Email Adress",
            type: "email",
            placeholder: "example@gmail.com",
        },
        {
            id: Date.now() + "5",
            name: "Phone Number",
            type: "tel",
            placeholder: "+254712345678",
        },
        {
            id: Date.now() + "8",
            name: "Postal Adress",
            type: "text",
            placeholder: "",
        },
    ];
    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <Cvsection
                    defaultFields={personalInfoDate}
                    heading="Personal Information"
                />
                <Education />
            </main>
        </div>
    );
}
export default App;
