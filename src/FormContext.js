// FormContext.js
import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    timetableName: "",
    timetableDescription: "",
    professorName: "",
    offDays: [],
    buildingName: "",
    classroomID: "",
    groupName: "",
    groupDescription: "",
    lectures: [
      {
        lectureName: "",
        lectureTime: "",
        sections: [{ division: "", enrollment: "", sectionTime: "" }],
      },
    ],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
