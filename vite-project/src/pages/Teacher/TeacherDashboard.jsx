import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard({ setUser }) {
  const navigate = useNavigate();

  const teacherAssignments = {
    "Form 2A": ["English", "Science"],
    "Form 3B": ["Math", "English"],
  };

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
  const [activeMenu, setActiveMenu] = useState("enterResults");

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setSubjects(teacherAssignments[cls] || []);
    setStudents(allStudents[cls] || []);
  };

  const handleScoreChange = (studentIndex, subject, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].scores[subject] = value;
    setStudents(updatedStudents);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{ backgroundColor: "#f8f9fa", color: "black" }}
    >
      {/* Sidebar */}
      <div
        className="p-3"
        style={{
          width: "250px",
          backgroundColor: "white",
          borderRight: "1px solid #ddd",
        }}
      >
        <h4 className="mb-4">Teacher Menu</h4>
        <ul className="nav flex-column">

          <li className="nav-item mb-2">
            <button
              className={`btn w-100 ${
                activeMenu === "dashboard"
                  ? "btn-secondary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveMenu("dashboard")}
            >
              Dashboard
            </button>
          </li>

          <li className="nav-item mb-2">
            <button
              className={`btn w-100 ${
                activeMenu === "enterResults"
                  ? "btn-secondary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveMenu("enterResults")}
            >
              Enter Results
            </button>
          </li>

          <li className="nav-item mb-2">
            <button
              className={`btn w-100 ${
                activeMenu === "messages"
                  ? "btn-secondary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveMenu("messages")}
            >
              Messages
            </button>
          </li>

          <li className="nav-item mb-2">
            <button
              className="btn btn-danger w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Welcome, Teacher</h2>

        {/* Enter Results Section */}
        {activeMenu === "enterResults" && (
          <>
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

            {selectedClass && (
              <>
                <h4 className="mt-4">Enter Scores for {selectedClass}</h4>
                <table className="table table-striped mt-3">
                  <thead className="table-light">
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
                                handleScoreChange(
                                  studentIndex,
                                  subj,
                                  e.target.value
                                )
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
          </>
        )}

        {/* Dashboard Placeholder */}
        {activeMenu === "dashboard" && (
          <h4 className="mt-4">Dashboard coming soon...</h4>
        )}

        {/* Messages Placeholder */}
        {activeMenu === "messages" && (
          <h4 className="mt-4">Messages feature coming soon...</h4>
        )}
      </div>
    </div>
  );
}
