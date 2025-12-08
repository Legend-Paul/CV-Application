import { useState } from "react";
import html2pdf from "html2pdf.js";
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
  const [dynamicFields, setDynamicFields] = useState([]);

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
    document.querySelector(".error-text").style.display = "none";
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
      } else {
        document.querySelector(".error-text").style.display = "block";
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

  function generateDate(days = 0) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  async function handleCvDownload() {
    const element = document.querySelector(".cv-overview");
    const options = {
      margin: 0.5,
      filename: "cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true, // Enable cross-origin resource sharing for images
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // Ensure proper page breaks
    };

    // Use the `html` rendering mode for selectable text and clickable links
    await html2pdf()
      .set(options)
      .from(element)
      .toPdf()
      .get("pdf")

      .save();
  }

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
                  knowldedgeSectionFields={knowldedgeSectionFields}
                  setKnowldedgeSectionFields={setKnowldedgeSectionFields}
                  updatedCvDataValues={updatedCvDataValues}
                  setUpdatedCvDataValues={setUpdatedCvDataValues}
                  urlLink={urlLink}
                  setUrlLink={setUrlLink}
                  addsSimalarFields={sectionData.addsSimalarFields}
                  canSubmit={canSubmit}
                  setCanSubmit={setCanSubmit}
                  handleSubmit={handleSubmit}
                  errorMsgObj={errorMsgObj}
                  setErrorMsgObj={setErrorMsgObj}
                  dynamicFields={dynamicFields}
                  setDynamicFields={setDynamicFields}
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
                  knowldedgeSectionFields={knowldedgeSectionFields}
                  setKnowldedgeSectionFields={setKnowldedgeSectionFields}
                  updatedCvDataValues={updatedCvDataValues}
                  setUpdatedCvDataValues={setUpdatedCvDataValues}
                  urlLink={urlLink}
                  setUrlLink={setUrlLink}
                  canSubmit={canSubmit}
                  setCanSubmit={setCanSubmit}
                  handleSubmit={handleSubmit}
                  errorMsgObj={errorMsgObj}
                  setErrorMsgObj={setErrorMsgObj}
                  dynamicFields={dynamicFields}
                  setDynamicFields={setDynamicFields}
                />
              );
            })}
            {dialogValuesObj.state && (
              <div className="dialog-overlay">
                <div className="dialog-content">
                  <p className="error-text">Section already exist</p>
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
            <div
              className="add-section-btn add-field-btn"
              onClick={handleDialogControl}
            >
              <button
                className="btns"
                type="button"
                style={{
                  color: "var(--moderate-green)",
                  borderColor: "var(--moderate-green)",
                  title: "Add Field",
                }}
              >
                ➕
              </button>
              <p>Add Section</p>
            </div>
          </div>
        )}{" "}
        <div
          className="cv-overview"
          style={{ display: inputFieldsDisplay.display }}
        >
          {updatedCvDataValues[initialCvSection]?.canUpdate && (
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
                  knowldedgeSectionFields={knowldedgeSectionFields}
                  urlLink={urlLink}
                  generateDate={generateDate}
                />
              )
            );
          })}
          {dynamicCvSection.map((cvSection) => {
            const sectionName = cvSection?.sectionName;
            return (
              updatedCvDataValues[sectionName] && (
                <AddationCVFields
                  key={cvSection.id} // Use a stable key
                  cvSectionName={sectionName}
                  sectionObj={updatedCvDataValues[sectionName]}
                  urlLink={urlLink}
                  id={cvSection.id}
                />
              )
            );
          })}
        </div>
      </main>
      <div className="action-btn-cont">
        <div className="download-cv-cont" onClick={handleCvDownload}>
          <button className="download-cv" type="button">
            <i className="bi bi-download"></i>
          </button>
          <p>Download Cv </p>
        </div>

        <div
          className="btn-cont fixed-btn-cont save-fields-btn"
          onClick={handleSubmit}
        >
          <button
            className="btns check-fields"
            type="button"
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
          <p>Save Changes</p>
        </div>

        {inputFieldsDisplay.isVisible ? (
          <div
            className="btn-cont fixed-btn-cont toggle-preview-btn-cont"
            onClick={() => {
              setInputFieldsDisplay({
                ...inputFieldsDisplay,
                isVisible: !inputFieldsDisplay.isVisible,
                display: "block",
                checkFiedBtnDisplay: "none",
              });
            }}
          >
            <i className="bi bi-eye"></i>
            <p>View Cv</p>
          </div>
        ) : (
          <div
            className="btn-cont fixed-btn-cont toggle-preview-btn-cont"
            onClick={() => {
              setInputFieldsDisplay(() => {
                return {
                  ...inputFieldsDisplay,
                  isVisible: !inputFieldsDisplay.isVisible,
                  display: "none",
                  checkFiedBtnDisplay: "inline-block",
                };
              });
            }}
          >
            <i className="bi bi-eye-slash close-preview"></i>
            <p>Hide Cv</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
