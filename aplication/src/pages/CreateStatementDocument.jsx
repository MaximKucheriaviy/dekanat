import { Box, Button, TextField } from "@mui/material";
import { LevelSelector } from "../componetns/LevelSelector";
import { useEffect, useState } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { CourseSelector } from "../componetns/CourseSelector";
import { SubjectSelector } from "../componetns/SubjectSelector";
import { StudentList } from "../componetns/StudentList";
import { SemesterSelector } from "../componetns/SemesterSelector";
import { ForeginerSelector } from "../componetns/ForeginerSelectror";
import { useDispatch } from "react-redux";
import { show } from "../redux/slices";
import { useSemester } from "../redux/selector";
import { useCource } from "../redux/selector";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { enable, disable } from "../redux/slices";

export const CreateStatemntDocument = () => {
  const [level, setLevel] = useState("");
  const [depID, setDepID] = useState("");
  const [planID, setPlanID] = useState("");
  const cource = useCource();
  const [subjectID, setSubjectID] = useState(null);
  const [students, setStudents] = useState([]);

  const [filePath, setFilePath] = useState("");
  const [examenator, setExamenator] = useState("");
  const [decan, setDecan] = useState("");
  const [foreginer, setForeginer] = useState(false);
  const dispatch = useDispatch();
  const semester = useSemester();
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigate = () => {
    console.log(subjectID);

    navigate("/fill_statement", {
      state: {
        from: location.pathname,
        students,
        subjectID,
        semester,
      },
    });
  };

  useEffect(() => {
    if (!level || !depID || !cource || !subjectID || !planID) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getStudentsByParams", {
        level,
        department: depID,
        educationPlan: planID,
        course: cource,
        status: "навчається",
      })
      .then((result) => {
        const data = JSON.parse(result);
        console.log(data);
        if (!data) {
          return;
        }
        console.log(subjectID);
        const st = data
          .filter((item) => item.subjects.some((sub) => sub._id === subjectID))
          .filter((item) => item.foreigner === foreginer)
          .sort((a, b) => a.sername.localeCompare(b.sername));
        setStudents(st);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [level, planID, depID, cource, subjectID, dispatch, foreginer]);

  const createSatement = () => {
    window.mainApi
      .invokeMain("createStatment", {
        OS: level,
        students,
        OOP: depID,
        c: cource,
        S: semester,
        subject: subjectID,
        filePath,
        teacher: examenator,
        decan,
      })
      .then(() => {
        dispatch(show({ title: "Відомість створено", type: "success" }));
      })
      .catch(() => {});
  };

  const setSavePath = () => {
    window.mainApi.invokeMain("selectFolder").then((data) => {
      const result = JSON.parse(data);
      if (!result) {
        return;
      }
      setFilePath(result);
    });
  };
  console.log(subjectID, "in fact");

  return (
    <Box>
      <h1>Створення оціночних відомостей</h1>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <LevelSelector level={level} setLevel={setLevel} />
          </Box>
          <Box width={"47%"}>
            <DepartmentSelector
              level={level}
              depID={depID}
              setdepID={setDepID}
              disabled={!level}
            />
          </Box>
        </Box>
        <Box marginTop={2} display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <PlanSelector
              level={level}
              planID={planID}
              setPlanID={setPlanID}
              disabled={!depID}
            />
          </Box>
          <Box width={"47%"}>
            <CourseSelector />
          </Box>
        </Box>

        <Box marginTop={2} display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <SemesterSelector />
          </Box>
          <Box width={"47%"}>
            <SubjectSelector
              subjectID={subjectID}
              setSubjectID={setSubjectID}
              educationPlan={planID}
              department={depID}
              semester={semester}
            />
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} mt={2}>
          <Box width={"47%"}>
            <TextField
              fullWidth
              label={"екзаменатор"}
              value={examenator}
              onChange={(event) => setExamenator(event.target.value)}
            />
          </Box>
          <Box width={"47%"}>
            <TextField
              fullWidth
              label={"декан"}
              value={decan}
              onChange={(event) => setDecan(event.target.value)}
            />
          </Box>
        </Box>
        <Box marginTop={2}>
          <Button variant="contained" onClick={setSavePath}>
            Вибрати шлях для збереження
          </Button>
          <Box marginTop={2} borderRadius={2} border={1} padding={1}>
            Шлях для збереження файлу:{" "}
            <span style={{ fontWeight: 700 }}>{filePath}</span>
          </Box>
        </Box>
        <Box>
          <ForeginerSelector
            label="Обрати іноземців"
            setForeigner={setForeginer}
            foreigner={foreginer}
          />
        </Box>
        <Box>{students.length !== 0 && <StudentList stuents={students} />}</Box>
        <Box marginTop={2}>
          <Button
            disabled={
              students.length === 0 ||
              !semester ||
              !decan ||
              !examenator ||
              !filePath
            }
            onClick={createSatement}
            variant="contained"
          >
            Створити відомість
          </Button>
          <Button
            disabled={students.length === 0 || !semester}
            variant="contained"
            sx={{ marginLeft: "30px" }}
            onClick={onNavigate}
          >
            Заповнити відомість
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
