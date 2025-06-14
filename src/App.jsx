import Cvsection from "./personal info/cvSection";
import Header from "./header/header";
import cvSectionData from "./utils/cvSectionData";
import "./App.css";
import "./index.css";
function App() {
    return (
        <div className="App">
            <Header />
            <main className="main-content">
                {cvSectionData.map((sectionData) => {
                    return (
                        <Cvsection
                            key={sectionData.id}
                            open={sectionData.isOpen}
                            defaultFields={sectionData.fields}
                            heading={sectionData.sectionName}
                            className={sectionData.class}
                        />
                    );
                })}

                {/* <Education /> */}
            </main>
        </div>
    );
}
export default App;
