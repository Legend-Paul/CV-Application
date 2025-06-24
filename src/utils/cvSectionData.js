let cvSectionData = [
    {
        sectionName: "Personal Infomation",
        id: self.crypto.randomUUID(),
        isOpen: true,
        class: "personal-info cv-section",

        addsSimalarFields: false,
        fields: [
            {
                id: self.crypto.randomUUID(),
                name: "Full Name",
                type: "text",
                placeholder: "Maina Paul",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Image",
                type: "file",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Title",
                type: "text",
                placeholder: "Software Engineer",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Email Adress",
                type: "email",
                placeholder: "example@gmail.com",
            },

            {
                id: self.crypto.randomUUID(),
                name: "Phone Number",
                type: "tel",
                placeholder: "+254712345678",
            },
        ],
    },
    {
        sectionName: "Education Background",
        id: self.crypto.randomUUID(),
        class: "education-info cv-section",
        addsSimalarFields: true,
        fields: [
            {
                id: self.crypto.randomUUID(),
                name: "Qualification1",
                type: "text",
                placeholder: "Bacherol Of Arts",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Qualification1 Institution",
                type: "text",
                placeholder: "Kenyatta University",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Qualification1 Start",
                type: "date",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Qualification1 End",
                type: "date",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Qualification1 Description",
                type: "textarea",
                placeholder: "Qualification1 Description",
            },
        ],
    },
    {
        sectionName: "Work Experience",
        id: self.crypto.randomUUID(),
        class: "work-experience cv-section",
        addsSimalarFields: true,
        fields: [
            {
                id: self.crypto.randomUUID(),
                name: "Experience1",
                type: "text",
                placeholder: "Software Engineer",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Experience1 Company Name",
                type: "text",
                placeholder: "Tech Company",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Experience1 Start Date",
                type: "date",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Experience1 End Date",
                type: "date",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Experience1 Description",
                type: "textarea",
                placeholder: "Experience1 Description",
            },
        ],
    },

    {
        sectionName: "Skills",
        id: self.crypto.randomUUID(),
        class: "skills cv-section",
        addsSimalarFields: true,
        fields: [
            {
                id: self.crypto.randomUUID(),
                name: "Skill1",
                type: "text",
                placeholder: "Communication",
            },
            {
                id: self.crypto.randomUUID(),
                name: "Skill1 Description",
                type: "textarea",
                placeholder: "Communication Description",
            },
        ],
    },
];

export default cvSectionData;
