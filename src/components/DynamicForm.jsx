import { useState } from "react";
import cross from "../assets/close.svg";

const initialFormConfig = {
  fields: [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true, validator: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Invalid email format" },
    { name: "age", label: "Age", type: "number", required: false },
    { name: "password", label: "Password", type: "password", required: true },
    { name: "gender", label: "Gender", type: "radio", options: ["Male", "Female", "Non Binary", "Transgender", "Others"], required: true },
    { name: "terms", label: "Accept Terms", type: "checkbox",  options: ["Yes"], required: true }
  ]
};

const DynamicForm = () => {
  const [formConfig, setFormConfig] = useState(initialFormConfig);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [newField, setNewField] = useState({ name: "", label: "", type: "text", required: false });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validate = () => {
    let newErrors = {};
    formConfig.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.validator && formData[field.name]) {
        const validationResult = field.validator(formData[field.name]);
        if (validationResult !== true) {
          newErrors[field.name] = validationResult;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted Data:", formData);
    }
  };

  const addField = () => {
    if (newField.label && newField.name) {
    setFormConfig((prevConfig) => ({
      fields: [...prevConfig.fields, { ...newField }]
    }));
    setNewField({ name: "", label: "", type: "text", required: false }); }
    else {
        alert("Please fill in the new name and label fields.")
    }

  };

  const removeField = (fieldName) => {
    setFormConfig((prevConfig) => ({
      fields: prevConfig.fields.filter(field => field.name !== fieldName)
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/2 h-max flex flex-col gap-6 w-full">
        <h1>Dynamic Form Builder</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {formConfig.fields.map((field) => (
          <div key={field.name} className="flex flex-col items-start w-full gap-1">
            <div className="flex justify-between items-end w-full">

            <label className="font-semibold">{field.label}</label>
            <button type="button" onClick={() => removeField(field.name)} className="border border-neutral-400 rounded-md my-1 p-1"><img className="lg:w-6 w-3" src={cross} /></button>
            </div>

            {field.type === "radio" || field.type === "checkbox" ? (
              field.options.map((option) => (
                <label key={option}>
                  <input
                    type={field.type}
                    name={field.name}
                    value={option}
                    onChange={handleChange}
                    className="mr-2 w-fit"
                  />
                  {option}
                </label>
              ))
            ) : (
              <input
                type={field.type}
                name={field.name}
                onChange={handleChange}
                required={field.required}
                placeholder={`Enter your ${field.label}`}
                className="border border-gray-300 w-full rounded-lg px-2 py-1 outline-none"
              />
            )}
            {errors[field.name] && <p className="text-red-500">{errors[field.name]}</p>}
         
          </div>
        ))}
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg">Submit</button>
      </form>

      <div className="mt-4 flex flex-col gap-2">
        <h3>Add New Field</h3>
        <input placeholder="Name" required className="border border-gray-300 w-full rounded-lg px-2 py-1 outline-none" value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} />
        <input placeholder="Label" required className="border border-gray-300 w-full rounded-lg px-2 py-1 outline-none" value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} />
        <select value={newField.type} className="border border-gray-300 w-full rounded-lg px-2 py-1 outline-none" onChange={(e) => setNewField({ ...newField, type: e.target.value })}>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
        </select>
        <label>
          <input type="checkbox" className="mr-2" checked={newField.required} onChange={(e) => setNewField({ ...newField, required: e.target.checked })} />
          Required
        </label>
        <button onClick={addField} className="bg-gray-900 text-white px-4 py-2 rounded-lg">Add Field</button>
      </div>
    </div>
  );
};

export default DynamicForm;
