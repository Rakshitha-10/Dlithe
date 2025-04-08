const mongoose = require("mongoose");
const { Department, Employee, Project, WorksOn, Dependent } = require("../Company_models/User");

mongoose.connect("mongodb://127.0.0.1:27017/Company")
    .then(async () => {
        try {
            // Example 1: Delete an employee by emp_id
            const deletedEmp = await Employee.deleteOne({ emp_id: 104 });
            console.log("Deleted Employee:", deletedEmp);

            // Example 2: Delete a dependent by name
            const deletedDep = await Dependent.deleteOne({ first_name: "Neha" });
            console.log("Deleted Dependent:", deletedDep);

            // Example 3: Remove a project
            const deletedProj = await Project.deleteOne({ proj_name: "Ad Campaign" });
            console.log("Deleted Project:", deletedProj);
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error("Connection error:", err));
