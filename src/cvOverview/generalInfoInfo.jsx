export default function GeneralInfo({
    updatedCvDataValues,
    cvSectionName,
    qualification,
    knowldedgeSectionFields,
    urlLink,
}) {
    const knowledgeInfoObj = updatedCvDataValues[cvSectionName];

    if (
        updatedCvDataValues[cvSectionName].canUpdate &&
        knowldedgeSectionFields[cvSectionName] &&
        Object.keys(updatedCvDataValues[cvSectionName]).length > 1
    )
        return (
            <div className="knowledge-details-container">
                <h3>{cvSectionName}</h3>
                {knowldedgeSectionFields[cvSectionName].map((i) => {
                    let id = self.crypto.randomUUID();

                    return (
                        <div key={id} className="knowledge-details">
                            {Object.entries(knowledgeInfoObj).map((entry) => {
                                const field = entry[0];
                                return Object.entries(entry[1]).map((value) => {
                                    if (
                                        value[0] === qualification + i &&
                                        value[1]
                                    ) {
                                        let id = self.crypto.randomUUID();

                                        return (
                                            <h4 key={id}>
                                                {i + ". " + value[1]}
                                            </h4>
                                        );
                                    } else if (
                                        value[0].includes(qualification + i) &&
                                        value[0] !== qualification + i &&
                                        value[1]
                                    ) {
                                        let id = self.crypto.randomUUID();
                                        let description = "";
                                        if (
                                            qualification === "Qualification" ||
                                            qualification === "Experience"
                                        ) {
                                            description =
                                                value[0].split(" ")[1] + ":";
                                        }

                                        let values = value[0].split(" ")[1];

                                        console.log(value);

                                        return (
                                            <div className="knowledge" key={id}>
                                                {field !== "textarea" && (
                                                    <div className="name-content">
                                                        <p>{values} : </p>
                                                        {urlLink[
                                                            cvSectionName
                                                        ] ? (
                                                            <a
                                                                href={
                                                                    urlLink[
                                                                        cvSectionName
                                                                    ]
                                                                }
                                                                target="_blank"
                                                            >
                                                                <p>{values}</p>
                                                            </a>
                                                        ) : (
                                                            <p>{value[1]}</p>
                                                        )}
                                                    </div>
                                                )}
                                                {field === "textarea" && (
                                                    <div
                                                        className="description"
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
