import { useState } from "react";
import { Input, Button } from "./utils/reusableIU";
import Cvsection from "./cvSections info/cvSection";
import Header from "./header/header";
import cvSectionData from "./utils/cvSectionData";
import "./App.css";
import "./index.css";
function App() {
    const initialCvSection = cvSectionData[0].sectionName;
    const [cvDataValues, setCvDataValues] = useState({
        "Personal Infomation": {},
    });
    const [activeCvSection, setActiveCvSection] = useState({
        name: initialCvSection,
        index: 0,
    });

    const [dialogValuesObj, setDialogValuesObj] = useState({
        state: false,
        cvSectionName: "",
    });

    const [dynamicCvSection, setDynamicCvSection] = useState([]);
    const handleCvDialogInputChange = (e) => {
        let cvSectionObj = {
            ...dialogValuesObj,
            cvSectionName: e.target.value,
        };
        setDialogValuesObj(cvSectionObj);
    };
    const handleDialogControl = () => {
        setDialogValuesObj({
            state: !dialogValuesObj.state,
            cvSectionName: "",
        });
    };
    const handledCvSection = () => {
        if (dialogValuesObj.cvSectionName.trim()) {
            const newCvSection = {
                id: Date.now(),
                sectionName: dialogValuesObj.cvSectionName.trim(),
            };

            setDynamicCvSection([...dynamicCvSection, newCvSection]);

            // Close dialog and reset values
            setDialogValuesObj({
                state: false,
                cvSectionName: "",
            });
        }
    };
    let personlInfoObj = cvDataValues[initialCvSection];
    return (
        <div className="App">
            <Header />
            <main className="main-content">
                {/* Render Default Cv sections */}
                <div className="cv-section">
                    {cvSectionData.map((sectionData, i) => {
                        return (
                            <Cvsection
                                key={sectionData.id}
                                open={sectionData.isOpen}
                                defaultFields={sectionData.fields}
                                heading={sectionData.sectionName}
                                className={sectionData.class}
                                cvDataValues={cvDataValues}
                                setCvDataValues={setCvDataValues}
                                activeCvSection={activeCvSection}
                                setActiveCvSection={setActiveCvSection}
                                index={i}
                            />
                        );
                    })}
                    {/* Render Dynamic Cv sections */}
                    {dynamicCvSection.map((cvSection, i) => {
                        return (
                            <Cvsection
                                key={cvSection.id}
                                open={false}
                                defaultFields={[]}
                                heading={cvSection.sectionName}
                                className={"cv-section"}
                                cvDataValues={cvDataValues}
                                setCvDataValues={setCvDataValues}
                                activeCvSection={activeCvSection}
                                setActiveCvSection={setActiveCvSection}
                                index={i + cvSectionData.length}
                            />
                        );
                    })}
                    {dialogValuesObj.state && (
                        <div className="dialog-overlay">
                            <div className="dialog-content">
                                <Input
                                    // inputValueObj={inputValueObj}
                                    handleOnchange={handleCvDialogInputChange}
                                    name="Input Title"
                                    placeholder="e.g., Hobbies, Projects"
                                    isDialog={dialogValuesObj}
                                />
                                <div className="buttons-container">
                                    <Button
                                        buttonTitle="Cancel"
                                        bgc="var(--red)"
                                        active="active"
                                        onClick={handleDialogControl}
                                    />
                                    <Button
                                        buttonTitle="Add Field"
                                        bgc="var(--moderate-green)"
                                        active={
                                            dialogValuesObj.cvSectionName.trim()
                                                ? "active"
                                                : "inactive"
                                        }
                                        onClick={handledCvSection}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        className="btns"
                        type="button"
                        onClick={handleDialogControl}
                        style={{
                            color: "var(--moderate-green)",
                            borderColor: "var(--moderate-green)",
                            title: "Add Field",
                        }}
                    >
                        ➕
                    </button>
                </div>
                <div className="cv-overview">
                    <div className="personal-infomation">
                        <div className="cv-heading">
                            <h2>
                                {personlInfoObj["text"] &&
                                    personlInfoObj["text"]["Full Name"]}
                            </h2>
                            <p>
                                {personlInfoObj["text"] &&
                                    personlInfoObj["text"]["Title"]}
                            </p>
                        </div>
                        <div className="personal-details">
                            <h3>{initialCvSection}</h3>

                            {Object.entries(personlInfoObj).map((items) => {
                                if (items[0] !== "textarea") {
                                    return (
                                        <div className="details-list">
                                            {Object.entries(items[1]).map(
                                                (item) => {
                                                    const key = item[0];
                                                    const value = item[1];

                                                    // Only render if the key is not "Full Name" or "Title"
                                                    if (
                                                        value &&
                                                        key !== "Full Name" &&
                                                        key !== "Title"
                                                    ) {
                                                        return (
                                                            <div
                                                                className="list"
                                                                key={key}
                                                            >
                                                                <div className="maker"></div>
                                                                <div className="detail">
                                                                    {" "}
                                                                    <p className="detail-name">
                                                                        {key} :
                                                                    </p>
                                                                    <p>
                                                                        {value}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    }

                                                    // Skip rendering for "Full Name" and "Title"
                                                }
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div className="textarea-field">
                            {Object.entries(personlInfoObj).map((items) => {
                                if (items[0] === "textarea") {
                                    return (
                                        <div className="text-area-cont">
                                            {Object.entries(items[1]).map(
                                                (item) => {
                                                    let key = item[0];
                                                    let value = item[1];
                                                    if (value) {
                                                        return (
                                                            <div className="textarea-content">
                                                                <h4>{key}</h4>
                                                                <p>{value}</p>
                                                            </div>
                                                        );
                                                    }
                                                }
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default App;
