import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindSurveys.css";

interface Survey {
  title: string;
  description: string;
  author: string;
}

const Search: React.FC = () => {
  
  const [searchQuery, setSearchQuery] = useState("");

  const surveyBank: Survey[] = [
    { title: "Student Engagement ", description: "A survey aimed at measuring the level of student engagement during class activities.", author: "John Doe" },
    { title: "Teacher Feedback Survey", description: "This survey collects anonymous feedback from students about their instructor's teaching methods.", author: "Jane Smith" },
    { title: "Course Evaluation Survey", description: "A comprehensive survey evaluating the effectiveness of the course curriculum.", author: "Emily Johnson" },
    { title: "Remote Learning Experience Survey", description: "This survey gathers information on the challenges and benefits of remote learning.", author: "David Williams" },
    { title: "Parent Involvement Survey", description: "A survey designed to assess the level of parent involvement in student education.", author: "Maria Brown" },
    { title: "Classroom Climate Survey", description: "This survey gauges how students feel about the overall classroom environment.", author: "Michael Taylor" },
    { title: "End-of-Year Reflection Survey", description: "A reflection survey to help students consider their progress throughout the year.", author: "Sophia Martinez" },
    { title: "Homework Habits Survey", description: "A survey that examines the consistency and effectiveness of students' homework habits.", author: "Chris Lee" },
    { title: "Social-Emotional Learning Survey", description: "This survey focuses on understanding students' emotional well-being and social interactions.", author: "Olivia Thompson" },
    { title: "Project-Based Learning Survey", description: "A survey to evaluate students' experiences with project-based learning activities.", author: "Alexander White" },
    { title: "Class Participation Survey", description: "This survey measures how often students actively participate during class discussions.", author: "Liam Harris" },
    { title: "Technology in Education Survey", description: "A survey that explores how students use technology as part of their learning.", author: "Emma Clark" },
    { title: "Peer Collaboration Survey", description: "This survey assesses how well students work together on group assignments.", author: "Noah Lewis" },
    { title: "School Safety Survey", description: "A survey to gather insights on students' perceptions of safety within the school environment.", author: "Isabella King" },
    { title: "Student Motivation Survey", description: "This survey focuses on what drives students to engage and succeed in school.", author: "James Hall" },
    { title: "Cultural Awareness Survey", description: "A survey that examines students' awareness and respect for cultural diversity.", author: "Charlotte Young" },
    { title: "Attendance & Punctuality Survey", description: "This survey tracks students' attendance patterns and timeliness.", author: "Benjamin Allen" },
    { title: "Extracurricular Interests Survey", description: "A survey aimed at discovering students' interests in extracurricular activities.", author: "Mia Scott" },
    { title: "Mental Health Awareness Survey", description: "This survey focuses on understanding students' mental health and well-being.", author: "William Nelson" },
    { title: "Reading Habits Survey", description: "A survey to measure how often and what types of books students are reading.", author: "Amelia Walker" },
    { title: "Study Strategies Survey", description: "This survey gathers information on the effectiveness of students' study strategies.", author: "Elijah Wright" },
    { title: "Satisfaction with School Facilities Survey", description: "A survey assessing students' satisfaction with the school's facilities and resources.", author: "Abigail Green" },
    { title: "Career Aspirations Survey", description: "This survey explores students' future career goals and aspirations.", author: "Lucas Adams" }
];


const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value.toLowerCase());
};

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
};

// Filter surveys based on the search query
 // Only filter if the searchQuery is not empty
 const filteredSurveys = searchQuery
 ? surveyBank.filter((survey) =>
     survey.title.toLowerCase().includes(searchQuery)
   )
 : [];
return (
  <div >
    <div className="search">
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Enter your search query..."
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #007bff",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </form>
    </div>

          {
            filteredSurveys.length > 0 ? (
              <div className="results">
                <div className="result-scroll">
              {filteredSurveys.map((survey, index) => (
            
                <div key={index} className="survey-result">
                  <div className="left-info"> 
                    <h3>{survey.title}</h3>
                    <small>Author: {survey.author}</small>
                  </div>
                
                  <p>{survey.description}</p>
                </div>
              ))}
              </div>
              </div>
            ) 
            : (
              <p>No results found</p>
              )
            }
  
    </div>
  );
};

export default Search;