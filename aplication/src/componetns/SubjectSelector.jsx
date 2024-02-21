import { TextField, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

export const SubjectSelector = ({
  educationPlan,
  department,
  setSubjectID,
  subjectID,
}) => {
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!educationPlan || !department) {
      return;
    }
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        educationPlan,
        department,
        nameCollapce: true,
      })
      .then((data) => {
        const subjects = JSON.parse(data);
        if (!subjects) {
          return;
        }
        setSubjects(subjects);
      });
  }, [department, educationPlan]);
  useEffect(() => {
    if (!value || !department || !educationPlan) {
      return;
    }
    const arr = value.split(" ");
    const sub = subjects.find((item) => item.code === arr[0]);
    setSubjectID(sub._id);
  }, [value, educationPlan, department, setSubjectID, subjects]);
  console.log(subjectID);
  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={subjects.map((item) => `${item.code} ${item.name}`)}
      sx={{ width: 300 }}
      renderInput={(params) => {
        return <TextField fullWidth {...params} label="Предмет" />;
      }}
    />
  );
};
