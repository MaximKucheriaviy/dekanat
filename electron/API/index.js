const getDepartments = require("./getDepartments");
const createStudent = require("./createStudent");
const getStudentByDepartment = require("./getStudentByDepartment");
const getAllStudents = require("./getAllStudents");
const getStudentById = require("./getStudentById");
const createSubject = require("./createSubject");
const getSubjecByDepartment = require("./getSubjectByDepartment");
const addMandatorySubjects = require("./addMandatorySubjects");
const updateStudent = require("./updateStudent");
const createColedgeMarkTable = require("./createColedgeMarkTable");
const createEducationPlan = require("./createEducationPlan");
const getEducationPlan = require("./getEducationPlan");
module.exports = {
  getDepartments,
  createStudent,
  getStudentByDepartment,
  getAllStudents,
  getStudentById,
  createSubject,
  getSubjecByDepartment,
  addMandatorySubjects,
  updateStudent,
  createEducationPlan,
  getEducationPlan,
  createColedgeMarkTable,
};
