import { useState } from "react";
import axios from "axios";

export default function EnrollTeacher() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    idNumber: "",
    tscNumber: "",
    subjects: []
  });

  const subjectsList = ["English","Kiswahili","Mathematics","Chemistry","Physics","Biology","Geography","French"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubjectToggle = (subject) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject) 
        ? prev.subjects.filter(s => s !== subject) 
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/register-teacher", form);
      alert("Teacher registered successfully ✅");
      setForm({ fullName: "", dob: "", idNumber: "", tscNumber: "", subjects: [] });
    } catch (err) {
      console.error(err);
      alert("Error registering teacher ❌");
    }
  };

  return (
    <div className="mt-4">
      <h4>Register Teacher</h4>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input 
          name="name" 
          value={form.fullName} 
          onChange={handleChange} 
          className="form-control mb-2" 
          required 
        />

        <label>Date of Birth</label>
        <input 
          name="dob" 
          type="date" 
          value={form.dob} 
          onChange={handleChange} 
          className="form-control mb-2" 
          required 
        />

        <label>ID Number</label>
        <input 
          name="idNumber" 
          value={form.idNumber} 
          onChange={handleChange} 
          className="form-control mb-2" 
          required 
        />

        <label>TSC Number</label>
        <input 
          name="tscNumber" 
          value={form.tscNumber} 
          onChange={handleChange} 
          className="form-control mb-2" 
          required 
        />

        <label>Subjects</label>
        <div className="mb-2">
          {subjectsList.map((subject) => (
            <div key={subject} className="form-check form-check-inline">
              <input
                type="checkbox"
                id={subject}
                className="form-check-input"
                checked={form.subjects.includes(subject)}
                onChange={() => handleSubjectToggle(subject)}
              />
              <label htmlFor={subject} className="form-check-label">{subject}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">Register Teacher</button>
      </form>
    </div>
  );
}
