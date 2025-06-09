import PersonalInfo from "./personal info/personalInfo";
import Header from "./header/header";
import "./App.css";
import "./index.css";
function App() {
    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <PersonalInfo />
            </main>
        </div>
    );
}
export default App;
