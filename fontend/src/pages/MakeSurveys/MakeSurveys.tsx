import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MakeSurveys.css";
import { useAuth } from "../../components/useAuth/useAuth";
import {createSurvey, createPrompt, createCategory} from "../../services/services";


interface Field {
  label: string;
  values: string[];
}

interface FormData {
  title: string;
  fields: Field[];
  additionalFields: number;
}

const FormSubmission: React.FC = () => {
  const API_PREFIX = "http://localhost:4000";

  const { user } = useAuth();  // Get user info from AuthProvider
  const [formData, setFormData] = useState<FormData>({
    title: "",
    fields: [{ label: "", values: [""] }],
    additionalFields: 0,
  });

 

  const handleChange = (
    fieldIndex: number,
    valueIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFields = [...formData.fields];
    newFields[fieldIndex].values[valueIndex] = event.target.value;
    setFormData({ ...formData, fields: newFields });
  };

  const handleAddField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, { label: "", values: [""] }],
      additionalFields: formData.additionalFields + 1,
    });
  };

  const handleAddValue = (index: number) => {
    const newFields = [...formData.fields];
    newFields[index].values.push("");
    setFormData({ ...formData, fields: newFields });
  };

  const handleDeleteField = (fieldIndex: number) => {
    const newFields = [...formData.fields];
    newFields.splice(fieldIndex, 1);
    setFormData({ ...formData, fields: newFields });
  };

  const handleDeleteValue = (fieldIndex: number, valueIndex: number) => {
    const newFields = [...formData.fields];
    newFields[fieldIndex].values.splice(valueIndex, 1);
    setFormData({ ...formData, fields: newFields });
  };

  


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      console.error("No user is logged in");
      return;
    }

    const token = user.token;

    try {
      // First, create the survey
      const surveyData = await createSurvey(token, formData.title, user.email);
      const surveyId = surveyData._id;

      // Create each category and its prompts
      for (const field of formData.fields) {
        const categoryData = await createCategory(token, surveyId, field.label);
        const categoryId = categoryData._id;

        // Post each value as a prompt
        for (const value of field.values) {
          await createPrompt(token, value, categoryId);
        }
      }

      console.log("All data submitted successfully");

    } catch (error) {
      console.error("Error:", error);
    }
  };

  

    return (
      <div className="form-card">
        <div>
          <h2 style={{ color: 'black' }}>New Survey</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Survey Title"
                style={{ width: "600px", height: "20px", marginBottom: "10px", fontSize: "18px" }}
              />
              {formData.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => {
                        const newFields = [...formData.fields];
                        newFields[fieldIndex].label = e.target.value;
                        setFormData({ ...formData, fields: newFields });
                      }}
                      placeholder="Label"
                      style={{ width: "470px", marginLeft: "200px", height: "15px"}} // Adjust the marginLeft here
                      />
                    <button
                      type="button"
                      className="form-button"
                      onClick={() => handleDeleteField(fieldIndex)} 
                    >
                      - Field
                    </button>
                    <button className="form-button" type="button" onClick={handleAddField}>
                    + Field
                    </button>
                    </div>
                    {field.values.map((value, valueIndex) => (
              <div key={valueIndex} style={{ display: "flex", margin: "5px" }}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(fieldIndex, valueIndex, e)}
                  placeholder="Value"
                  style={{ width: "470px", marginLeft: "225px", height: "15px" }}
                />
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteValue(fieldIndex, valueIndex)}
                  style={{ fontSize: "12px" }}
                >
                  -
                </button>
              </div>
            ))}
                 
                    <button  className="add-button" type="button" onClick={() => handleAddValue(fieldIndex)}>
                       +
                    </button>
                  </div>
                ))}
              
              <button className="inner-button" type="submit">Submit</button>
            </form>
          
        </div>
      </div>
    );
  };

export default FormSubmission;
