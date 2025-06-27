import { useState } from "react";
import { Input, Button } from "./utils/reusableIU";
import Cvsection from "./cvSections info/cvSection";
import Header from "./header/header";
import cvSectionData from "./utils/cvSectionData";
import PersonalDetailsOverview from "./cvOverview/personalInfo";
import GeneralInfo from "./cvOverview/generalInfoInfo";
import AddationCVFields from "./cvOverview/AdditionalCvFields";
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
    const [errorMsgObj, setErrorMsgObj] = useState({});

    const [dialogValuesObj, setDialogValuesObj] = useState({
        state: false,
        cvSectionName: "",
    });
    const [canSubmit, setCanSubmit] = useState(true);

    const [dynamicCvSection, setDynamicCvSection] = useState([]);

    const [knowldedgeSectionFields, setKnowldedgeSectionFields] = useState({
        [cvSectionData[1].sectionName]: [1],
    });

    const [urlLink, setUrlLink] = useState({ "Personal Infomation": {} });

    const [inputFieldsDisplay, setInputFieldsDisplay] = useState({
        buttonType: "preview",
        isVisible: true,
    });

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
            let name = dialogValuesObj.cvSectionName.trim();
            let isNamePresent = cvSectionData.some((sectionData) => {
                return (
                    sectionData.sectionName.toLocaleLowerCase() ===
                    name.toLocaleLowerCase()
                );
            });

            if (!isNamePresent) {
                const newCvSection = {
                    id: Date.now(),
                    sectionName: name,
                };

                setDynamicCvSection([...dynamicCvSection, newCvSection]);
                // Close dialog and reset values
                setDialogValuesObj({
                    state: false,
                    cvSectionName: "",
                });
            }
        }
    };
    const handleSubmit = () => {
        if (canSubmit) {
            setCvDataValues({
                ...cvDataValues,
                [activeCvSection.name]: {
                    ...cvDataValues[activeCvSection.name],
                    canUpdate: true,
                },
            });
            setUpdatedCvDataValues({
                ...cvDataValues,
                [activeCvSection.name]: {
                    ...cvDataValues[activeCvSection.name],
                    canUpdate: true,
                },
            });
        }
    };

    return (
        <div className="App">
            <Header />
            <main className="main-content">
                {/* Render Default Cv sections */}
                {inputFieldsDisplay.isVisible && (
                    <div className="cv-sections">
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
                                    knowldedgeSectionFields={
                                        knowldedgeSectionFields
                                    }
                                    setKnowldedgeSectionFields={
                                        setKnowldedgeSectionFields
                                    }
                                    updatedCvDataValues={updatedCvDataValues}
                                    setUpdatedCvDataValues={
                                        setUpdatedCvDataValues
                                    }
                                    urlLink={urlLink}
                                    setUrlLink={setUrlLink}
                                    addsSimalarFields={
                                        sectionData.addsSimalarFields
                                    }
                                    canSubmit={canSubmit}
                                    setCanSubmit={setCanSubmit}
                                    handleSubmit={handleSubmit}
                                    errorMsgObj={errorMsgObj}
                                    setErrorMsgObj={setErrorMsgObj}
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
                                    knowldedgeSectionFields={
                                        knowldedgeSectionFields
                                    }
                                    setKnowldedgeSectionFields={
                                        setKnowldedgeSectionFields
                                    }
                                    updatedCvDataValues={updatedCvDataValues}
                                    setUpdatedCvDataValues={
                                        setUpdatedCvDataValues
                                    }
                                    urlLink={urlLink}
                                    setUrlLink={setUrlLink}
                                    canSubmit={canSubmit}
                                    setCanSubmit={setCanSubmit}
                                    handleSubmit={handleSubmit}
                                    errorMsgObj={errorMsgObj}
                                    setErrorMsgObj={setErrorMsgObj}
                                />
                            );
                        })}
                        {dialogValuesObj.state && (
                            <div className="dialog-overlay">
                                <div className="dialog-content">
                                    <Input
                                        // inputValueObj={inputValueObj}
                                        handleOnchange={
                                            handleCvDialogInputChange
                                        }
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
                )}{" "}
                <div
                    className="cv-overview"
                    style={{ display: inputFieldsDisplay.display }}
                >
                    {updatedCvDataValues[initialCvSection].canUpdate && (
                        <PersonalDetailsOverview
                            updatedCvDataValues={updatedCvDataValues}
                            cvSectionName={initialCvSection}
                            urlLink={urlLink}
                        />
                    )}
                    {cvSectionData.slice(1).map((sectionData) => {
                        let name = sectionData.sectionName;
                        return (
                            updatedCvDataValues[name] && (
                                <GeneralInfo
                                    key={sectionData.id}
                                    updatedCvDataValues={updatedCvDataValues}
                                    cvSectionName={name}
                                    qualification={sectionData.mainName}
                                    knowldedgeSectionFields={
                                        knowldedgeSectionFields
                                    }
                                    urlLink={urlLink}
                                />
                            )
                        );
                    })}
                    {dynamicCvSection.map((cvSection) => {
                        <AddationCVFields
                            cvSectionName={cvSection.cvSectionName}
                            personlInfoObj={cvSection}
                            urlLink={urlLink}
                        />;
                    })}
                </div>
            </main>
            <div className="preview-btn-cont">
                <button
                    className="btns check-fields"
                    type="button"
                    onClick={handleSubmit}
                    style={{
                        color:
                            Object.keys(errorMsgObj).length < 1 && canSubmit
                                ? "var(--blue)"
                                : "var(--light-blue)",
                        borderColor:
                            Object.keys(errorMsgObj).length < 1 && canSubmit
                                ? "var(--blue)"
                                : "var(--light-blue)",
                        cursor:
                            Object.keys(errorMsgObj).length < 1 && canSubmit
                                ? "pointer"
                                : "not-allowed",
                        title: "Submit",
                    }}
                    disabled={!Object.keys(errorMsgObj).length > 1}
                >
                    ✓
                </button>

                {inputFieldsDisplay.isVisible ? (
                    <i
                        className="bi bi-eye"
                        onClick={() => {
                            setInputFieldsDisplay({
                                ...inputFieldsDisplay,
                                isVisible: !inputFieldsDisplay.isVisible,
                                display: "block",
                                checkFiedBtnDisplay: "none",
                            });
                        }}
                    ></i>
                ) : (
                    <i
                        className="bi bi-eye-slash close-preview"
                        onClick={() => {
                            setInputFieldsDisplay({
                                ...inputFieldsDisplay,
                                isVisible: !inputFieldsDisplay.isVisible,
                                display: "none",
                                checkFiedBtnDisplay: "inline-block",
                            });
                        }}
                    ></i>
                )}
            </div>
        </div>
    );
}
export default App;
