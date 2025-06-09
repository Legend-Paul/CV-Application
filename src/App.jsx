import PersonalInfo from "./personal info/personalInfo";
import Header from "./header/header";
import Education from "./education/education";
import "./App.css";
import "./index.css";
function App() {
    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <PersonalInfo />
                <Education />
            </main>
        </div>
    );
}
export default App;
