const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Company", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// Department Schema
const DepartmentSchema = new mongoose.Schema({
    dept_id: { type: Number, unique: true, required: true },
    dept_name: { type: String, unique: true, required: true },
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", index: true },
    start_date: { type: Date, default: Date.now },
    location: { type: String }
}, { timestamps: true });

const Department = mongoose.model("Department", DepartmentSchema);

// Employee Schema
const EmployeeSchema = new mongoose.Schema({
    emp_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    ssn: { type: String, unique: true, required: true },
    address: { type: String },
    salary: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    birth_date: { type: Date },
    dept_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department", index: true },
    supervisor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", index: true }
}, { timestamps: true });

const Employee = mongoose.model("Employee", EmployeeSchema);

// Project Schema
const ProjectSchema = new mongoose.Schema({
    proj_id: { type: Number, unique: true, required: true },
    proj_name: { type: String, unique: true, required: true },
    dept_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department", index: true },
    location: { type: String }
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);

// WorksOn Schema
const WorksOnSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", index: true },
    proj_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project", index: true },
    hours_per_week: { type: Number }
}, { timestamps: true });

const WorksOn = mongoose.model("WorksOn", WorksOnSchema);

// Dependent Schema
const DependentSchema = new mongoose.Schema({
    dependent_id: { type: Number, unique: true, required: true },
    emp_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", index: true },
    first_name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    birth_date: { type: Date },
    relationship: { type: String }
}, { timestamps: true });

const Dependent = mongoose.model("Dependent", DependentSchema);

module.exports = { Department, Employee, Project, WorksOn, Dependent };