require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create multiple students
const createStudents = async () => {
    try {
        const students = [
            {
                studentId: "STU001",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                age: 20,
                grade: "A",
                subjects: [
                    { name: "Mathematics", score: 95 },
                    { name: "Science", score: 88 }
                ]
            },
            {
                studentId: "STU002",
                firstName: "Sarah",
                lastName: "Smith",
                email: "sarah.smith@example.com",
                age: 19,
                grade: "B+",
                subjects: [
                    { name: "Mathematics", score: 85 },
                    { name: "Science", score: 92 },
                    { name: "English", score: 88 }
                ]
            },
            {
                studentId: "STU003",
                firstName: "Michael",
                lastName: "Johnson",
                email: "michael.j@example.com",
                age: 21,
                grade: "A-",
                subjects: [
                    { name: "Mathematics", score: 90 },
                    { name: "Physics", score: 95 },
                    { name: "Chemistry", score: 87 }
                ]
            },
            {
                studentId: "STU004",
                firstName: "Emma",
                lastName: "Wilson",
                email: "emma.w@example.com",
                age: 18,
                grade: "A+",
                subjects: [
                    { name: "Mathematics", score: 98 },
                    { name: "Biology", score: 96 },
                    { name: "Chemistry", score: 94 }
                ]
            },
            {
                studentId: "STU005",
                firstName: "David",
                lastName: "Brown",
                email: "david.b@example.com",
                age: 20,
                grade: "B",
                subjects: [
                    { name: "Mathematics", score: 82 },
                    { name: "Physics", score: 85 },
                    { name: "Computer Science", score: 90 }
                ]
            },
            {
                studentId: "STU006",
                firstName: "Lisa",
                lastName: "Anderson",
                email: "lisa.a@example.com",
                age: 19,
                grade: "A",
                subjects: [
                    { name: "Mathematics", score: 92 },
                    { name: "Statistics", score: 95 },
                    { name: "Economics", score: 88 }
                ]
            }
        ];

        // Clear existing students
        await Student.deleteMany({});
        
        // Insert all students
        const createdStudents = await Student.insertMany(students);
        console.log('All students created successfully:', createdStudents);
    } catch (error) {
        console.error('Error creating students:', error);
    }
};

// Find all students
const getAllStudents = async () => {
    try {
        const students = await Student.find();
        console.log('\nAll students in database:');
        students.forEach(student => {
            console.log(`\nStudent: ${student.firstName} ${student.lastName}`);
            console.log(`ID: ${student.studentId}`);
            console.log(`Grade: ${student.grade}`);
            console.log('Subjects:');
            student.subjects.forEach(subject => {
                console.log(`- ${subject.name}: ${subject.score}`);
            });
        });
    } catch (error) {
        console.error('Error finding students:', error);
    }
};

// Run the examples
createStudents().then(() => {
    getAllStudents();
}); 