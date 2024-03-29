import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export const StudentList = () => {
  const { id, level } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [department, setDepartment] = useState({});
  const [course, setCourse] = useState("Всі");
  // const [level, setLevel] = useState("Всі");

  console.log(course);
  useEffect(() => {
    window.mainApi.invokeMain("getStudentByDepartment", id).then((result) => {
      let students = JSON.parse(result);
      if (!students) {
        return;
      }
      if (course !== "Всі") {
        students = students.filter((item) => item.course === course);
      }
      if (level !== "Всі") {
        students = students.filter((item) => item.level === level);
      }

      students.sort((a, b) => a.sername.localeCompare(b.sername));
      setStudents(students);
    });
    window.mainApi.invokeMain("getDeparments", { id }).then((result) => {
      console.log(id);
      setDepartment(JSON.parse(result));
    });
  }, [id, course, level]);

  return (
    <Box>
      <h1>
        {department.name} {level}
      </h1>
      <Grid container columnGap={3}>
        <Grid xs={1}>
          <FormControl fullWidth>
            <InputLabel>Курс</InputLabel>
            <Select
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              label="відділення"
            >
              <MenuItem value={"Всі"}>Всі</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid xs={2}>
          <FormControl fullWidth>
            <InputLabel>ОС</InputLabel>
            <Select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              label="ОС"
            >
              <MenuItem value={"Всі"}>Всі</MenuItem>
              <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
              <MenuItem value={"магістр"}>магістр</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
      <Box marginTop={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Прізвище</TableCell>
              <TableCell>Ім'я</TableCell>
              <TableCell>Курс</TableCell>
              <TableCell>Освітній ступінь</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.sername}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.level}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      navigate(`/students_info/${item._id}`, {
                        state: { from: location.pathname },
                      });
                    }}
                    sx={{
                      padding: 0,
                      minWidth: 0,
                      borderRadius: "50%",
                      height: "30px",
                    }}
                  >
                    <CiCirclePlus style={{ width: "100%", height: "100%" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
