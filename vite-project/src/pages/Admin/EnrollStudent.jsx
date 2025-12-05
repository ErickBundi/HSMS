import { useState, useEffect } from "react";
import axios from "axios";

export default function EnrollStudent() {
  const [form, setForm] = useState({
    admissionNumber: "",
    fullName: "",
    dob: "",
    className: "",
    parentName: "",
    parentContact: ""
  });

  const classes = ["Form 1", "Form 2", "Form 3", "Form 4"];

  useEffect(() => {
    const fetchNextAdmissionNumber = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/next-admission-number");
        setForm(prev => ({ ...prev, admissionNumber: res.data.nextNumber }));
      } catch (err) {
        console.error("Error fetching admission number", err);
      }
    };
    fetchNextAdmissionNumber();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/register-student", form);
      alert("Student registered successfully ✅");
      setForm(prev => ({ ...prev, fullName: "", dob: "", className: "", parentName: "", parentContact: "" }));
    } catch (err) {
      console.error(err);
      alert("Error registering student ❌");
    }
  };

  return (
    <div className="mt-4">
      <h4>Register Student</h4>
      <form onSubmit={handleSubmit}>
        <label>Admission Number</label>
        <input name="admissionNumber" value={form.admissionNumber} readOnly className="form-control mb-2" />

        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} className="form-control mb-2" required />

        <label>Date of Birth</label>
        <input name="dob" type="date" value={form.dob} onChange={handleChange} className="form-control mb-2" required />

        <label>Class/Form</label>
        <select name="className" value={form.className} onChange={handleChange} className="form-select mb-2" required>
          <option value="">Select Class</option>
          {classes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Parent Name</label>
        <input name="parentName" value={form.parentName} onChange={handleChange} className="form-control mb-2" required />

        <label>Parent Contact</label>
        <input name="parentContact" value={form.parentContact} onChange={handleChange} className="form-control mb-2" required />

        <button type="submit" className="btn btn-primary">Register Student</button>
      </form>
    </div>
  );
}
