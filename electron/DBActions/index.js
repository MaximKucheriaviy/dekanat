const getDepartments = require("./GetDepartmnet");
const createStudent = require("./createStudent");
const getStudentByDepartmant = require("./getStudentsByDepartment");
const getAllStudents = require("./getAllStudents");
const getStudentById = require("./getStudentById");
const createSubjecet = require("./createSubject");
const getSubjectByDepartmant = require("./getSubjectsByDepartment");
const addMandatorySubjects = require("./addMandatorySubjects");
const updateStudent = require("./updateStudent");
const addSubjectToStudent = require("./addSubjectToStudent");

module.exports = {
  getDepartments,
  createStudent,
  getStudentByDepartmant,
  getAllStudents,
  getStudentById,
  createSubjecet,
  getSubjectByDepartmant,
  addMandatorySubjects,
  updateStudent,
  addSubjectToStudent,
};