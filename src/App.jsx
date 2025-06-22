import { useState } from "react";
import { Input, Button } from "./utils/reusableIU";
import Cvsection from "./cvSections info/cvSection";
import Header from "./header/header";
import cvSectionData from "./utils/cvSectionData";
import PersonalDetailsOverview, {
    EducationDetailSection,
} from "./cvOverview/overView";
import "./App.css";
import "./index.css";
function App() {
    const initialCvSection = cvSectionData[0].sectionName;
    const [cvDataValues, setCvDataValues] = useState({
        "Personal Infomation": { canUpdate: false },
    });
    const [updatedCvDataValues, setUpdatedCvDataValues] = useState({
        ...cvDataValues,
    });

    const [activeCvSection, setActiveCvSection] = useState({
        name: initialCvSection,
        index: 0,
        canUpdate: false,
    });

    const [dialogValuesObj, setDialogValuesObj] = useState({
        state: false,
        cvSectionName: "",
    });

    const [dynamicCvSection, setDynamicCvSection] = useState([]);
    const [educationSectionFields, setEducationSectionFields] = useState([1]);
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
    // console.log(updatedCvDataValues);

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
                                educationSectionFields={educationSectionFields}
                                setEducationSectionFields={
                                    setEducationSectionFields
                                }
                                updatedCvDataValues={updatedCvDataValues}
                                setUpdatedCvDataValues={setUpdatedCvDataValues}
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
                    {updatedCvDataValues[initialCvSection].canUpdate && (
                        <PersonalDetailsOverview
                            updatedCvDataValues={updatedCvDataValues}
                            cvSectionName={initialCvSection}
                        />
                    )}

                    {updatedCvDataValues["Education Background"] && (
                        <EducationDetailSection
                            updatedCvDataValues={updatedCvDataValues}
                            cvSectionName={"Education Background"}
                            qualification={"Qualification"}
                            educationSectionFields={educationSectionFields}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
export default App;
