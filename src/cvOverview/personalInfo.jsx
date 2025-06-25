import AddationCVFields from "./AdditionalCvFields";
export default function PersonalDetailsOverview({
    updatedCvDataValues,
    cvSectionName,
    urlLink,
}) {
    const personlInfoObj = updatedCvDataValues[cvSectionName];
    return (
        <div className="personal-infomation">
            <div className="cv-heading">
                <div className="image">
                    {urlLink["Image"] && (
                        <img
                            src={urlLink["Image"]}
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
                personlInfoObj={personlInfoObj}
                urlLink={urlLink}
            />
        </div>
    );
}
