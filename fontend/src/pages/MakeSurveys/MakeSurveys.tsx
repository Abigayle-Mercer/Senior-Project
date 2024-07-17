import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MakeSurveys.css";

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

  const [formData, setFormData] = useState<FormData>({
    title: "",
    fields: [{ label: "", values: [""] }],
    additionalFields: 0,
  });
  const navigate = useNavigate();

  const navigateToDashBoard = () => {
    navigate("/DashBoard");
  };

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:");
    console.log("Title:", formData.title);
    formData.fields.forEach((field) => {
      console.log("Label:", field.label);
      console.log("Values:", field.values);
    });
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
                style={{ width: "600px", marginBottom: "10px" }}
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
                      style={{ width: "500px", marginLeft: "100px", height: "15px"}} // Adjust the marginLeft here
                      />
                    <button
                      type="button"
                      className="form-buttton"
                      onClick={() => handleDeleteField(fieldIndex)} 
                    >
                      Delete Label
                    </button>
                    </div>
                    {field.values.map((value, valueIndex) => (
              <div key={valueIndex} style={{ display: "flex", margin: "5px" }}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(fieldIndex, valueIndex, e)}
                  placeholder="Value"
                  style={{ width: "300px", marginLeft: "125px", height: "15px" }}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteValue(fieldIndex, valueIndex)}
                  style={{ fontSize: "12px" }}
                >
                  Delete
                </button>
              </div>
            ))}
                 
                    <button  className="form-buttton" type="button" onClick={() => handleAddValue(fieldIndex)}>
                       Add Value
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
