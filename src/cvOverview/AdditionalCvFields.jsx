export default function AddationCVFields({
    cvSectionName,
    personlInfoObj,
    urlLink,
}) {
    urlLink = urlLink[cvSectionName];
    return (
        <div className="section-fields overview-section">
            <div className="personal-details">
                <h3>{cvSectionName}</h3>

                {Object.entries(personlInfoObj).map((items) => {
                    if (items[0] !== "textarea") {
                        return Object.entries(items[1]).map((item) => {
                            const id = self.crypto.randomUUID();
                            const key = item[0];
                            const value = item[1];

                            // Only render if the key is not "Full Name"  "Title" and image
                            if (
                                value &&
                                key !== "Full Name" &&
                                key !== "Title" &&
                                key !== "Image"
                            ) {
                                return (
                                    <div className="list" key={id}>
                                        <div className="maker"></div>
                                        <div className="detail">
                                            {" "}
                                            <p className="detail-name">
                                                {key} :
                                            </p>
                                            {urlLink[key] ? (
                                                <a href={key} target="_blank">
                                                    {key}
                                                </a>
                                            ) : (
                                                <p>
                                                    {items[0] === "email" ? (
                                                        <a
                                                            href={
                                                                "mailto:" +
                                                                value
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {value}
                                                        </a>
                                                    ) : items[0] === "tel" ? (
                                                        <a
                                                            href={
                                                                "tel:" + value
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {value}
                                                        </a>
                                                    ) : (
                                                        value
                                                    )}
                                                </p>
                                            )}
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
                                                <p>{key}</p>
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
