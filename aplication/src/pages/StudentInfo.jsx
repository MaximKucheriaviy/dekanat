import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TextField,
  Checkbox,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { intToABC, intToNational } from "../serivce/formulas";
import { useSemester } from "../redux/selector";
import { SemesterSelector } from "../componetns/SemesterSelector";

export const StudentInfo = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const semester = useSemester();
  const [subjects, setSubjects] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const arr = [];
  for (let i = 1; i <= 8; i++) {
    arr.push(i);
  }
  useEffect(() => {
    window.mainApi.invokeMain("getStudentById", id).then((result) => {
      setStudent(JSON.parse(result));
    });
  }, [id]);
  useEffect(() => {
    if (!student.subjects) {
      return;
    }
    const arr = student.subjects.filter(
      (item) => item.semesters[semester - 1].include
    );
    setSubjects(arr);
  }, [student, semester]);

  const markInputHandle = (name) => {
    return async (event) => {
      const mark = Number.parseInt(event.target.value);
      if (mark != event.target.value && event.target.value !== "") {
        console.log("not a number");
        return;
      }
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: student.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };

  const markInputHandleUndef = (_id) => {
    return async (event) => {
      const obj = JSON.parse(JSON.stringify(student));
      obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].mark = event.target.value;

      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: obj.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };

  const redeliveryHandle = (_id) => {
    return async (event) => {
      const obj = JSON.parse(JSON.stringify(student));
      obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].reDelivery = !obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].reDelivery;

      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: obj.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };

  const markChageHandle = (_id) => {
    return (event) => {
      setStudent((prev) => {
        const obj = JSON.parse(JSON.stringify(prev));
        obj.subjects.find((item) => item._id === _id).semesters[
          semester - 1
        ].mark = event.target.value;
        return obj;
      });
    };
  };

  const ignoreHandle = (_id) => {
    return async (event) => {
      const obj = JSON.parse(JSON.stringify(student));
      obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].ignore = !obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].ignore;

      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: obj.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };

  return (
    <Box>
      <Button
        onClick={() => {
          navigate(location.state.from);
        }}
      >
        Назад
      </Button>
      <Box>
        <Box>
          <Box display="flex" gap={3}>
            <h1>{student.sername}</h1>
            <h1>{student.name}</h1>
          </Box>
          <Box marginBottom={10}>
            <h1>{student.secondName}</h1>
          </Box>
        </Box>
        <Box display={"flex"} gap={10}>
          <Box>
            <p>відділення: </p>
            <h3>{student.department && student.department.name}</h3>
          </Box>
          <Box>
            <p>освітній ступінь: </p>
            <h3>{student.level}</h3>
          </Box>
          <Box>
            <p>курс: </p>
            <h3>{student.course}</h3>
          </Box>
          <Box>
            <p>рік вступу: </p>
            <h3>{student.startYear}</h3>
          </Box>
          <Box>
            <p>статус: </p>
            <h3>{student.status}</h3>
          </Box>
        </Box>
      </Box>
      <Box borderTop={1}>
        <h2>Предмети</h2>
        <Box width={"300px"}>
          <SemesterSelector />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"300px"}>Назва</TableCell>
              <TableCell width={"50px"}>Оцінка</TableCell>
              <TableCell>ECTS</TableCell>
              <TableCell>Національна шкала</TableCell>
              <TableCell>Перездача</TableCell>
              <TableCell>Ігнорувати</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.semesters[semester - 1].assessmentType !== 1 ? (
                    <TextField
                      onChange={markChageHandle(item._id)}
                      value={
                        student.subjects.find((i) => i._id === item._id)
                          .semesters[semester - 1].mark || ""
                      }
                      size="small"
                      onBlur={markInputHandle()}
                    />
                  ) : (
                    <Box width={"50px"}>
                      <FormControl fullWidth>
                        <Select
                          value={
                            student.subjects.find((i) => i._id === item._id)
                              .semesters[semester - 1].mark || ""
                          }
                          onChange={markInputHandleUndef(item._id)}
                        >
                          <MenuItem value={undefined}>...</MenuItem>
                          <MenuItem value={"Зараховано"}>Зараховано</MenuItem>
                          <MenuItem value={"Незараховано"}>
                            Незараховано
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  {intToABC(
                    student.subjects.find((i) => i._id === item._id).semesters[
                      semester - 1
                    ].mark
                  )}
                </TableCell>
                <TableCell>
                  {intToNational(
                    student.subjects.find((i) => i._id === item._id).semesters[
                      semester - 1
                    ].mark
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={
                      student.subjects.find((i) => i._id === item._id)
                        .semesters[semester - 1].reDelivery
                    }
                    onChange={redeliveryHandle(item._id)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={
                      student.subjects.find((i) => i._id === item._id)
                        .semesters[semester - 1].ignore
                    }
                    onChange={ignoreHandle(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box paddingTop={10}>
          <h2>Операції</h2>
          <Box
            alignItems={"flex-start"}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
          >
            {/* <Button variant="contained" onClick={mandatoryAdd}>
              Додати обов'язкові предмети
            </Button> */}
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/edit_student/${student._id}`, {
                  state: location.state,
                });
              }}
            >
              Редагувати
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
