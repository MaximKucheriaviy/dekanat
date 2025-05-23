import { calculateAvarage } from "../serivce/calculateAvarage";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import styled from "@emotion/styled";
import { Fragment } from "react";
import { intToABC, intToNational } from "../serivce/formulas";

const redColor = "#ff7d7d";
const ignoreColor = "#39ffbd";
const whiteColor = "#ffffff";

const getColor = (ignore, reDelivery) => {
  if (ignore) {
    return ignoreColor;
  } else if (reDelivery) {
    return redColor;
  }
  return whiteColor;
};

const StyledTableCell = styled(TableCell)`
  border: 1px solid black;
  background-color: ${({ color = "#ffffff" }) => color};
`;

const GrayCell = styled(StyledTableCell)`
  border: 1px solid black;
  background-color: #c5c5c5;
`;

const StickyCell = styled(StyledTableCell)`
  left: 0;
  background-color: #a0beff;
  box-shadow: 5px 2px 5px grey;
  border-right: "2px solid black";
  position: sticky;
`;

const OrangeCell = styled(StyledTableCell)`
  border: 1px solid black;
  background-color: orange;
`;

export const SummaryReport = ({ students, subjects, semester }) => {
  return (
    <>
      <h3>Відомість</h3>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <StickyCell sx={{ minWidth: "350px" }}></StickyCell>
              {students.map((item) => (
                <OrangeCell
                  key={item._id}
                  colSpan={3}
                  sx={{ minWidth: "300px" }}
                >{`${item.name} ${item.sername}`}</OrangeCell>
              ))}
            </TableRow>
            <TableRow>
              <StickyCell></StickyCell>
              {students.map((item) => (
                <Fragment key={item._id}>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </Fragment>
              ))}
            </TableRow>
            {subjects.map((item) => (
              <TableRow key={item._id}>
                <StickyCell
                  sx={{
                    padding: "5px",
                  }}
                >
                  {item.name}
                </StickyCell>
                {students.map((student) => {
                  const subject = student.subjects.find(
                    (sub) => sub._id === item._id
                  );
                  if (subject) {
                    const reDelivery =
                      subject.semesters[semester - 1].reDelivery;
                    const ignore = subject.semesters[semester - 1].ignore;
                    const value = subject.semesters[semester - 1].mark || "Н/А";
                    if (subject.semesters[semester - 1].assessmentType !== 1) {
                      return (
                        <Fragment key={student._id}>
                          <StyledTableCell color={getColor(ignore, reDelivery)}>
                            {intToABC(value)}
                          </StyledTableCell>
                          <StyledTableCell color={getColor(ignore, reDelivery)}>
                            {value}
                          </StyledTableCell>
                          <StyledTableCell color={getColor(ignore, reDelivery)}>
                            {intToNational(value, student.level)}
                          </StyledTableCell>
                        </Fragment>
                      );
                    } else {
                      return (
                        <Fragment key={student._id}>
                          <StyledTableCell
                            color={getColor(ignore, reDelivery)}
                          ></StyledTableCell>
                          <StyledTableCell color={getColor(ignore, reDelivery)}>
                            {value}
                          </StyledTableCell>
                          <StyledTableCell
                            color={getColor(ignore, reDelivery)}
                          ></StyledTableCell>
                        </Fragment>
                      );
                    }
                  } else {
                    return (
                      <Fragment key={student._id}>
                        <GrayCell></GrayCell>
                        <GrayCell></GrayCell>
                        <GrayCell></GrayCell>
                      </Fragment>
                    );
                  }
                })}
              </TableRow>
            ))}
            <TableRow>
              <StickyCell>Середній бал</StickyCell>
              {students.map((item) => {
                return (
                  <StyledTableCell key={item._id} colSpan={3}>
                    {calculateAvarage(item.subjects, semester, item.contract)}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
