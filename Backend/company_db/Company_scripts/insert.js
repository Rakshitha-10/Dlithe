const mongoose = require("mongoose");
const { Department, Employee, Project, WorksOn, Dependent } = require("../Company_models/User");

const addData = async () => {
    try {
        const departments = await Department.insertMany([
            { dept_id: 1, dept_name: "HR", location: "New York" },
            { dept_id: 2, dept_name: "IT", location: "San Francisco" },
            { dept_id: 3, dept_name: "Finance", location: "Chicago" },
            { dept_id: 4, dept_name: "Marketing", location: "Los Angeles" }
        ]);

        const employees = await Employee.insertMany([
            { emp_id: 101, name: "Ananya", ssn: "123-45-6789", address: "NY", salary: 50000, gender: "Female", birth_date: "1995-06-15", dept_id: departments[0]._id },
            { emp_id: 102, name: "Rahul", ssn: "987-65-4321", address: "SF", salary: 60000, gender: "Male", birth_date: "2000-03-22", dept_id: departments[1]._id },
            { emp_id: 103, name: "Priya", ssn: "567-89-0123", address: "Chicago", salary: 55000, gender: "Female", birth_date: "1998-07-10", dept_id: departments[2]._id },
            { emp_id: 104, name: "Amit", ssn: "234-56-7890", address: "LA", salary: 58000, gender: "Male", birth_date: "1997-04-05", dept_id: departments[3]._id }
        ]);

        const projects = await Project.insertMany([
            { proj_id: 201, proj_name: "AI Research", dept_id: departments[1]._id, location: "SF" },
            { proj_id: 202, proj_name: "Recruitment Drive", dept_id: departments[0]._id, location: "NY" },
            { proj_id: 203, proj_name: "Financial Analysis", dept_id: departments[2]._id, location: "Chicago" },
            { proj_id: 204, proj_name: "Ad Campaign", dept_id: departments[3]._id, location: "LA" }
        ]);

        await WorksOn.insertMany([
            { emp_id: employees[0]._id, proj_id: projects[0]._id, hours_per_week: 10 },
            { emp_id: employees[1]._id, proj_id: projects[1]._id, hours_per_week: 15 },
            { emp_id: employees[2]._id, proj_id: projects[2]._id, hours_per_week: 20 },
            { emp_id: employees[3]._id, proj_id: projects[3]._id, hours_per_week: 25 }
        ]);

        await Dependent.insertMany([
            { dependent_id: 301, emp_id: employees[0]._id, first_name: "Aarav", gender: "Male", birth_date: "2020-09-10", relationship: "Son" },
            { dependent_id: 302, emp_id: employees[1]._id, first_name: "Isha", gender: "Female", birth_date: "2018-12-05", relationship: "Daughter" },
            { dependent_id: 303, emp_id: employees[2]._id, first_name: "Karan", gender: "Male", birth_date: "2017-05-15", relationship: "Son" },
            { dependent_id: 304, emp_id: employees[3]._id, first_name: "Neha", gender: "Female", birth_date: "2016-03-20", relationship: "Daughter" }
        ]);

        console.log(" Company Database Populated Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error(" Error inserting data:", error);
    }
};

mongoose.connect("mongodb://127.0.0.1:27017/Company")
    .then(() => addData())
    .catch(err => console.error(" MongoDB Connection Error:", err));