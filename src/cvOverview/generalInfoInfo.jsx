export default function GeneralInfo({
  updatedCvDataValues,
  cvSectionName,
  qualification,
  knowldedgeSectionFields,
  urlLink,
  generateDate,
}) {
  const generalInfoObj = updatedCvDataValues[cvSectionName];

  if (
    updatedCvDataValues[cvSectionName].canUpdate &&
    knowldedgeSectionFields[cvSectionName] &&
    Object.keys(updatedCvDataValues[cvSectionName]).length > 1
  )
    return (
      <div className={`general-details-container overview-section`}>
        <h3>{cvSectionName}</h3>
        {knowldedgeSectionFields[cvSectionName].map((i) => {
          let id = self.crypto.randomUUID();

          return (
            <div key={id} className="general-details">
              {Object.entries(generalInfoObj).map((entry) => {
                const field = entry[0];
                return Object.entries(entry[1]).map((value) => {
                  if (value[0] === qualification + i && value[1]) {
                    let id = self.crypto.randomUUID();

                    return <h4 key={id}>{i + ". " + value[1]}</h4>;
                  } else if (
                    value[0].includes(qualification + i) &&
                    value[0] !== qualification + i &&
                    value[1]
                  ) {
                    let id = self.crypto.randomUUID();
                    let description = "";
                    if (
                      qualification === "Qualification" ||
                      qualification === "Experience" ||
                      cvSectionName === "Projects"
                    ) {
                      description = value[0].split(" ")[1] + ":";
                    }

                    let values = value[0].split(" ")[1];
                    values = values === "Start" ? "From" : values;
                    values =
                      values === "End" && value[1] === generateDate()
                        ? "To"
                        : values;

                    return (
                      <div className="general" key={id}>
                        {field !== "textarea" && (
                          <div className="name-content">
                            <p>{values} : </p>
                            {field === "url" ? (
                              <a
                                className="general-info-link"
                                href={value[1]}
                                target="_blank"
                              >
                                {values == "Code" || values == "Preview"
                                  ? values + " Link"
                                  : values}
                              </a>
                            ) : (
                              <p>{values === "To" ? "Present" : value[1]}</p>
                            )}
                          </div>
                        )}
                        {field === "textarea" && (
                          <div
                            className="textarea-content"
                            id={qualification.toLowerCase()}
                          >
                            <p>{description}</p>
                            <p>{value[1]}</p>
                          </div>
                        )}
                      </div>
                    );
                  }
                });
              })}
            </div>
          );
        })}
      </div>
    );
}
