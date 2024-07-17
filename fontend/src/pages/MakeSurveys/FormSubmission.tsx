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
    <div className="card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Form Title"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {formData.fields.map((field, fieldIndex) => (
          <div key={fieldIndex} style={{ marginBottom: "5px" }}>
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
                style={{ width: "100%" }}
              />
              <button
                type="button"
                onClick={() => handleDeleteField(fieldIndex)}
                style={{ fontSize: "12px", margin: "5px" }}
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
                  style={{ width: "calc(100% - 80px)", marginRight: "10px" }}
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
            <button type="button" onClick={() => handleAddValue(fieldIndex)}>
              Add Value
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField}>
          Add Field
        </button>
        <button type="submit">Submit</button>
      </form>
      <button onClick={navigateToDashBoard}>Back</button>
    </div>
  );
};

export default FormSubmission;
