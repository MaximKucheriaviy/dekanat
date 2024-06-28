import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { useNavigate } from "react-router-dom";

export const AdminActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getStartYear = (cource) => {
    const data = new Date(Date.now());
    let year = data.getFullYear() - cource;
    if (data.getMonth() >= 8) {
      year += 1;
    }
    return year;
  };
  const updateYear = async () => {
    dispatch(enable());
    const allStudents = JSON.parse(
      await window.mainApi.invokeMain("getAllStudents")
    );
    for (let i = 0; i < allStudents.length; i++) {
      const year = getStartYear(allStudents[i].course);
      await window.mainApi.invokeMain("updateStudent", {
        id: allStudents[i]._id,
        info: {
          startYear: year,
        },
      });
    }

    dispatch(disable());
  };
  return (
    <Box>
      <h2>Адміністрування системи</h2>
      <Button onClick={updateYear} variant="contained">
        Оновити рік вступу всіх студентів
      </Button>
      <Button onClick={() => navigate("/errors")} variant="contained">
        Error list
      </Button>
    </Box>
  );
};
