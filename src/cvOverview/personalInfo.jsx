import AddationCVFields from "./AdditionalCvFields";
export default function PersonalDetailsOverview({
    updatedCvDataValues,
    cvSectionName,
    urlLink,
}) {
    const personlInfoObj = updatedCvDataValues[cvSectionName];
    let personalInfoLinks = urlLink[cvSectionName]
        ? urlLink[cvSectionName]
        : {};
    return (
        <div className="personal-infomation">
            <div
                className={
                    Object.keys(personlInfoObj).length > 1 ? "cv-heading" : ""
                }
            >
                <div className="image">
                    {personalInfoLinks["Image"] && (
                        <img
                            src={personalInfoLinks["Image"]}
                            alt={
                                personlInfoObj["text"] &&
                                personlInfoObj["text"]["Title"] + " image"
                            }
                        />
                    )}
                </div>
                <div className="name-title">
                    <h2>
                        {personlInfoObj["text"] &&
                            personlInfoObj["text"]["Full Name"]}
                    </h2>
                    <p>
                        {personlInfoObj["text"] &&
                            personlInfoObj["text"]["Title"]}
                    </p>
                </div>
            </div>
            <AddationCVFields
                cvSectionName={cvSectionName}
                sectionObj={personlInfoObj}
                urlLink={urlLink}
            />
        </div>
    );
}
