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
                name: "Qualification",
                type: "text",
                placeholder: "Bacherol Of Arts",
            },
            {
                id: Date.now() + "10",
                name: "Institution",
                type: "text",
                placeholder: "Kenyatta University",
            },
            {
                id: Date.now() + "11",
                name: "Start",
                type: "date",
                placeholder: "Bacherol Of Arts",
            },
            {
                id: Date.now() + "12",
                name: "End",
                type: "date",
                placeholder: "Bacherol Of Arts",
            },
            {
                id: Date.now() + "13",
                name: "Description",
                type: "textarea",
                placeholder: "Qualification Description",
            },
        ],
    },
];

export default cvSectionData;
