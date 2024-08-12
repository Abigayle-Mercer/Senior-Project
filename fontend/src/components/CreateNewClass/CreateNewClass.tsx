import React, { useState } from "react";
import "./CreateNewClass.css"; // Add custom styles here if needed

interface Student {
  name: string;
  email: string;
}

const bank_of_students: Student[] = [
  { name: "Student 1", email: "student1@gmail.com" },
  { name: "Student 2", email: "abbymercer2@gmail.com" },
  { name: "Student 3", email: "gabevidlack3@gmail.com" },
  { name: "Student 4", email: "briellebrick4@gmail.com" },
  { name: "Student 6", email: "jcolunga5@gmail.com" },
  { name: "Student 7", email: "ameyers6@gmail.com" },
  { name: "Student 8", email: "lucyvid7@gmail.com" },
  { name: "Student 9", email: "johnpond8@gmail.com" },
  { name: "Student 10", email: "jackcalahan9@gmail.com" },
  { name: "Student 11", email: "brinlee10@gmail.com" },
  { name: "Student 12", email: "luckypond11@gmail.com" },
  { name: "Student 13", email: "saralanz12@gmail.com" },
  { name: "Student 14", email: "johnwick13@gmail.com" },
  { name: "Student 15", email: "lakenjames14@gmail.com" },
  { name: "Student 16", email: "carleyray14@gmail.com" },
  { name: "Student 17", email: "carentick4@gmail.com" },
  { name: "Student 18", email: "julieoolei14@gmail.com" },
  { name: "Student 19", email: "abigaylem14@gmail.com" },
  { name: "Student 20", email: "syvlierock14@gmail.com" },
  { name: "Student 21", email: "lainapond14@gmail.com" },
  { name: "Student 22", email: "tiffanypond14@gmail.com" },
  { name: "Student 23", email: "tylerolsen14@gmail.com" },
  { name: "Student 24", email: "stanmercer14@gmail.com" },
];

const CreateNewClass: React.FC = () => {
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState<Student[]>([
 
  ]); // Example students list
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassName(event.target.value);
  };

  const handleAddStudentButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setSearchResults(
      bank_of_students.filter(student =>
        student.email.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchTerm(""); // Clear search term
    setSearchResults([]); // Clear search results
    setIsPopupVisible(false); // Close the popup
    if (student) {
      setStudents([...students, student]);
    }
  };

  const handleRemoveStudent = (email: string) => {
    setStudents(students.filter(student => student.email !== email));
  };

  const handleSubmit = () => {
    // Handle submit logic here, e.g., send className and students to backend or update state
    console.log("Class Name:", className);
    console.log("Students:", students);
  };

  return (
    <div className="create-class-container">
      <div className="form-group">
        <label htmlFor="class-name">Class Name:</label>
        <input
          type="text"
          id="class-name"
          value={className}
          onChange={handleClassNameChange}
          placeholder="Enter class name"
        />
      </div>
      <div className="students-card">
        <ul>
          {students.map((student, index) => (
            <li key={index} className="student-row">
              <span className="student-name">{student.name}</span>
              <span className="student-email">{student.email}</span>
              <button
                className="remove-student"
                onClick={() => handleRemoveStudent(student.email)}
              >
                🗑️
              </button>
            </li>
          ))}
          <button onClick={handleAddStudentButtonClick} className="add-student">
            + Add Student
          </button>
        </ul>
      </div>
      <button onClick={handleSubmit} className="submit-btn">Submit</button>

      {/* Popup */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by email..."
            />
            <ul className="search-results">
              {searchResults.map((student, index) => (
                <li key={index} onClick={() => handleSelectStudent(student)}>
                  {student.name} ({student.email})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewClass;
