import "../index.css";
function PersonalDetailsOverview({ updatedCvDataValues, cvSectionName }) {
    const personlInfoObj = updatedCvDataValues[cvSectionName];
    return (
        <div className="personal-infomation">
            <div className="cv-heading">
                <h2>
                    {personlInfoObj["text"] &&
                        personlInfoObj["text"]["Full Name"]}
                </h2>
                <p>
                    {personlInfoObj["text"] && personlInfoObj["text"]["Title"]}
                </p>
            </div>
            <div className="personal-details">
                <h3>{cvSectionName}</h3>

                {Object.entries(personlInfoObj).map((items) => {
                    if (items[0] !== "textarea") {
                        return Object.entries(items[1]).map((item) => {
                            const id = self.crypto.randomUUID();
                            const key = item[0];
                            const value = item[1];

                            // Only render if the key is not "Full Name" or "Title"
                            if (
                                value &&
                                key !== "Full Name" &&
                                key !== "Title"
                            ) {
                                return (
                                    <div className="list" key={id}>
                                        <div className="maker"></div>
                                        <div className="detail">
                                            {" "}
                                            <p className="detail-name">
                                                {key} :
                                            </p>
                                            <p>{value}</p>
                                        </div>
                                    </div>
                                );
                            }

                            // Skip rendering for "Full Name" and "Title"
                        });
                    }
                })}
            </div>
            <div className="textarea-field">
                {Object.entries(personlInfoObj).map((items) => {
                    if (items[0] === "textarea") {
                        return (
                            <div className="text-area-cont">
                                {Object.entries(items[1]).map((item) => {
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
                                })}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

function EducationDetailSection({
    updatedCvDataValues,
    cvSectionName,
    qualification,
    educationSectionFields,
}) {
    const educationInfoObj = updatedCvDataValues[cvSectionName];
    if (updatedCvDataValues["Education Background"].canUpdate)
        return (
            <div className="education-details">
                <h3>{cvSectionName}</h3>
                {educationSectionFields.map((i) => {
                    let id = self.crypto.randomUUID();

                    return (
                        <div key={id} className="education">
                            {Object.entries(educationInfoObj).map((entry) => {
                                const field = entry[0];

                                return Object.entries(entry[1]).map((value) => {
                                    if (
                                        value[0] === qualification + i &&
                                        value[1]
                                    ) {
                                        let id = self.crypto.randomUUID();

                                        return <h4 key={id}>{value[1]}</h4>;
                                    } else if (
                                        value[0].includes(qualification + i) &&
                                        value[0] !== qualification + i &&
                                        value[1]
                                    ) {
                                        let id = self.crypto.randomUUID();

                                        return (
                                            <div className="education" key={id}>
                                                {field !== "textarea" && (
                                                    <div className="name-content">
                                                        <p>
                                                            {
                                                                value[0].split(
                                                                    " "
                                                                )[1]
                                                            }{" "}
                                                            :
                                                        </p>
                                                        <p>{value[1]}</p>
                                                    </div>
                                                )}
                                                {field === "textarea" && (
                                                    <div className="name-content description-content">
                                                        <p>
                                                            {
                                                                value[0].split(
                                                                    " "
                                                                )[1]
                                                            }{" "}
                                                            :
                                                        </p>
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

export { PersonalDetailsOverview as default, EducationDetailSection };
