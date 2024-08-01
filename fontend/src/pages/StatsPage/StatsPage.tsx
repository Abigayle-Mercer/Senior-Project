import React, { useState, ChangeEvent } from "react";

type SurveyData = {
  [key: string]: string[];
};

const surveys: SurveyData = {
  survey1: ["10.1.2023", "11.2.2023"],
  survey2: ["9.14.2023", "10.25.2023"],
  survey3: ["12.1.2023", "4.2.2024", "6.14.2024"],
};

function StatsPage() {
  const [selectedSurvey, setSelectedSurvey] = useState<string>("");
  const [selectedDate1, setSelectedDate1] = useState<string>("");
  const [selectedDate2, setSelectedDate2] = useState<string>("");


  const handleSurveyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const survey = event.target.value;
    setSelectedSurvey(survey);
    setSelectedDate1(""); // Reset selected date when survey changes
    setSelectedDate2(""); // Reset selected date when survey changes
  };

  const handleDate1Change = (event: ChangeEvent<HTMLSelectElement>) => {
    const date = event.target.value;
    setSelectedDate1(date);
  };
  const handleDate2Change = (event: ChangeEvent<HTMLSelectElement>) => {
    const date = event.target.value;
    setSelectedDate2(date);
  };



  return (
    <div>
      <p>THIS IS THE STATS PAGE</p>
      <div style={{ display: "flex" }}>
        <div>
          <label htmlFor="surveySelect">Select Survey:</label>
          <select
            id="surveySelect"
            value={selectedSurvey}
            onChange={handleSurveyChange}
          >
            <option value="">Choose a survey</option>
            {Object.keys(surveys).map((survey) => (
              <option key={survey} value={survey}>
                {survey}
              </option>
            ))}
          </select>
        </div>
        <div>
          {selectedSurvey && (
            <div>
              <label htmlFor="dateSelect">Select Date:</label>
              <select
                id="dateSelect"
                value={selectedDate1}
                onChange={handleDate1Change}
              >
                <option value="">Choose a date</option>
                {surveys[selectedSurvey].map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              <label htmlFor="dateSelect">Select Date:</label>
              <select
                id="dateSelect"
                value={selectedDate2}
                onChange={handleDate2Change}
              >
                <option value="">Choose a date</option>
                {surveys[selectedSurvey].map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
