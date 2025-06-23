export default function EducationDetailSection({
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
