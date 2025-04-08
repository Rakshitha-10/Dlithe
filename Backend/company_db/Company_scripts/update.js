const mongoose = require("mongoose");
const { Department, Employee, Project, WorksOn, Dependent } = require("../Company_models/User");

mongoose.connect("mongodb://127.0.0.1:27017/Company")
    .then(async () => {
        try {
            // Example 1: Update employee salary
            const updated = await Employee.updateOne({ emp_id: 101 }, { $set: { salary: 65000 } });
            console.log("Updated Employee Salary:", updated);

            // Example 2: Update department location
            const updateDept = await Department.updateOne({ dept_name: "IT" }, { $set: { location: "Seattle" } });
            console.log("Updated Department Location:", updateDept);

            // Example 3: Add supervisor to an employee
            const rahul = await Employee.findOne({ emp_id: 102 });
            const ananya = await Employee.findOne({ emp_id: 101 });
            const supervisorUpdate = await Employee.updateOne({ _id: rahul._id }, { $set: { supervisor_id: ananya._id } });
            console.log("Updated Supervisor:", supervisorUpdate);
        } catch (err) {
            console.error("Update error:", err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error("Connection error:", err));
