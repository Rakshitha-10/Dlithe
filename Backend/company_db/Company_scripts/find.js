const mongoose = require("mongoose");
const { Department, Employee, Project, WorksOn, Dependent } = require("../Company_models/User");

mongoose.connect("mongodb://127.0.0.1:27017/Company")
    .then(async () => {
        try {
            // Example 1: Find all employees
            const employees = await Employee.find().populate("dept_id");
            console.log("All Employees:", employees);

            // Example 2: Find projects by department name
            const hrDept = await Department.findOne({ dept_name: "HR" });
            const hrProjects = await Project.find({ dept_id: hrDept._id });
            console.log("HR Projects:", hrProjects);

            // Example 3: Find dependents of employee "Ananya"
            const ananya = await Employee.findOne({ name: "Ananya" });
            const dependents = await Dependent.find({ emp_id: ananya._id });
            console.log("Ananya's Dependents:", dependents);
        } catch (err) {
            console.error("Find error:", err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error("Connection error:", err));
