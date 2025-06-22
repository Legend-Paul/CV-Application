let cvSectionData = [
    {
        sectionName: "Personal Infomation",
        id: "sdjifhgv",
        isOpen: true,
        class: "personal-info cv-section",
        fields: [
            {
                id: Date.now() + "1",
                name: "Full Name",
                type: "text",
                placeholder: "Maina Paul",
            },
            {
                id: Date.now() + "3",
                name: "Title",
                type: "text",
                placeholder: "Software Engineer",
            },
            {
                id: Date.now() + "2",
                name: "Email Adress",
                type: "email",
                placeholder: "example@gmail.com",
            },
            {
                id: Date.now() + "5",
                name: "Phone Number",
                type: "tel",
                placeholder: "+254712345678",
            },
        ],
    },
    {
        sectionName: "Education Background",
        id: "hjfbh",
        class: "education-info cv-section",
        fields: [
            {
                id: Date.now() + "9",
                name: "Qualification1",
                type: "text",
                placeholder: "Bacherol Of Arts",
            },
            {
                id: Date.now() + "10",
                name: "Qualification1 Institution",
                type: "text",
                placeholder: "Kenyatta University",
            },
            {
                id: Date.now() + "11",
                name: "Qualification1 Start",
                type: "date",
            },
            {
                id: Date.now() + "12",
                name: "Qualification1 End",
                type: "date",
            },
            {
                id: Date.now() + "13",
                name: "Qualification1 Description",
                type: "textarea",
                placeholder: "Qualification1 Description",
            },
        ],
    },
];

export default cvSectionData;
