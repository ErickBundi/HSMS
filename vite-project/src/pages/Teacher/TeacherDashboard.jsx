import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard({ setUser }) {
  const navigate = useNavigate();

  // Mock data: classes and subjects assigned to the logged-in teacher
  const teacherAssignments = {
    "Form 2A": ["English", "Science"],
    "Form 3B": ["Math", "English"],
  };

  // Mock student data
  const allStudents = {
    "Form 2A": [
      { name: "John Doe", scores: {} },
      { name: "Alice Brown", scores: {} },
    ],
    "Form 3B": [
      { name: "Jane Smith", scores: {} },
      { name: "Bob Johnson", scores: {} },
    ],
  };

  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // When teacher selects a class
  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setSubjects(teacherAssignments[cls] || []);
    setStudents(allStudents[cls] || []);
  };

  // Update a score for a specific student and subject
  const handleScoreChange = (studentIndex, subject, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].scores[subject] = value;
    setStudents(updatedStudents);
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{ backgroundColor: "darkgreen", color: "white" }}
    >
      {/* Sidebar */}
      <div className="p-3" style={{ width: "250px", backgroundColor: "#2e4d2e" }}>
        <h4 className="mb-4">Teacher Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100">Dashboard</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100">Enter Results</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100">Messages</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Welcome, Teacher</h2>

        {/* Class selection */}
        <div className="mb-3">
          <label className="form-label">Select Class:</label>
          <select
            className="form-select w-50"
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="">-- Choose Class --</option>
            {Object.keys(teacherAssignments).map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Scores Table */}
        {selectedClass && (
          <>
            <h4 className="mt-4">Enter Scores for {selectedClass}</h4>
            <table className="table table-dark table-striped mt-3">
              <thead>
                <tr>
                  <th>Student Name</th>
                  {subjects.map((subj, index) => (
                    <th key={index}>{subj} Score</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, studentIndex) => (
                  <tr key={studentIndex}>
                    <td>{s.name}</td>
                    {subjects.map((subj, subjIndex) => (
                      <td key={subjIndex}>
                        <input
                          type="number"
                          className="form-control"
                          value={s.scores[subj] || ""}
                          onChange={(e) =>
                            handleScoreChange(studentIndex, subj, e.target.value)
                          }
                          min="0"
                          max="100"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
