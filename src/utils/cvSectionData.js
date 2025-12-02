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
        isLink: "",
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
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Email Adress",
        type: "email",
        placeholder: "example@gmail.com",
        isLink: "",
      },

      {
        id: self.crypto.randomUUID(),
        name: "Phone Number",
        type: "tel",
        placeholder: "+254712345678",
        isLink: "",
      },
    ],
  },
  {
    sectionName: "Education",
    id: self.crypto.randomUUID(),
    class: "education-info cv-section",
    addsSimalarFields: true,
    mainName: "Qualification",

    fields: [
      {
        id: self.crypto.randomUUID(),
        name: "Qualification1",
        type: "text",
        placeholder: "Bacherol Of Arts",
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Qualification1 Institution",
        type: "text",
        placeholder: "Kenyatta University",
        isLink: "",
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
        isLink: "",
      },
    ],
  },
  {
    sectionName: "Work Experience",
    id: self.crypto.randomUUID(),
    class: "work-experience cv-section",
    addsSimalarFields: true,
    mainName: "Experience",
    fields: [
      {
        id: self.crypto.randomUUID(),
        name: "Experience1",
        type: "text",
        placeholder: "Software Engineer",
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Experience1 Company Name",
        type: "text",
        placeholder: "Tech Company",
        isLink: "",
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
        isLink: "",
      },
    ],
  },

  {
    sectionName: "Skills",
    id: self.crypto.randomUUID(),
    class: "skills cv-section",
    addsSimalarFields: true,
    mainName: "Skill",
    fields: [
      {
        id: self.crypto.randomUUID(),
        name: "Skill1",
        type: "text",
        placeholder: "Communication",
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Skill1 Description",
        type: "textarea",
        placeholder: "Communication Description",
        isLink: "",
      },
    ],
  },
  {
    sectionName: "Projects",
    id: self.crypto.randomUUID(),
    class: "projects cv-section",
    addsSimalarFields: true,
    mainName: "Project",
    fields: [
      {
        id: self.crypto.randomUUID(),
        name: "Project1",
        type: "text",
        placeholder: "Weather App",
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Project1 Code Link",
        type: "url",
        placeholder: "https://github.com/username/weather-app",
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Project1 Preview Link",
        type: "url",
        placeholder: "https://weather-app-demo.com",
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Project1 Description",
        type: "textarea",
        placeholder: "Project1 Description",
        isLink: "",
      },
    ],
  },
  {
    sectionName: "Hobbies",
    id: self.crypto.randomUUID(),
    class: "hobbies cv-section",
    addsSimalarFields: true,
    mainName: "Hobby",
    fields: [
      {
        id: self.crypto.randomUUID(),
        name: "Hobby1",
        type: "text",
        placeholder: "Reading",
        isLink: "",
      },
      {
        id: self.crypto.randomUUID(),
        name: "Hobby1 Description",
        type: "textarea",
        placeholder: "Reading Description",
        isLink: "",
      },
    ],
  },
];

export default cvSectionData;
