import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for student's performance
const studentPerformance = {
  name: "John Doe",
  subjects: {
    English: 78,
    Math: 85,
    Science: 90,
    History: 72,
    Geography: 88,
  },
  classAverage: {
    English: 80,
    Math: 82,
    Science: 88,
    History: 75,
    Geography: 85,
  },
  topStudent: {
    English: 92,
    Math: 95,
    Science: 98,
    History: 88,
    Geography: 90,
  },
};

export default function ParentDashboard({ setUser }) {
  const [selectedSubject, setSelectedSubject] = useState("English");
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="vh-100 d-flex flex-column" style={{ backgroundColor: "darkgreen", color: "white" }}>
      {/* Sidebar + Main content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="p-3" style={{ width: "250px", backgroundColor: "#2e4d2e" }}>
          <h4 className="mb-4">Parent Menu</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button className="btn btn-outline-light w-100">Performance Overview</button>
            </li>
            <li className="nav-item mb-2">
              <button className="btn btn-outline-light w-100">Contact Teacher</button>
            </li>
            <li className="nav-item mb-2">
              <button className="btn btn-outline-light w-100" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h2 className="mb-4">Welcome, Parent</h2>

          {/* Continuous Performance Row */}
          <h4>{studentPerformance.name}'s Performance</h4>
          <div className="d-flex justify-content-between bg-dark text-white p-3 mb-4 rounded">
            {Object.entries(studentPerformance.subjects).map(([subject, score], idx) => (
              <div
                key={idx}
                className="text-center flex-grow-1"
                style={{
                  borderRight: idx !== Object.entries(studentPerformance.subjects).length - 1 ? "1px solid white" : "none",
                  padding: "0 10px",
                }}
              >
                <strong>{subject}</strong>
                <div>{score} / 100</div>
              </div>
            ))}
          </div>

          {/* Performance Per Subject */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <h5>Performance by Subject</h5>
              <select
                className="form-select mb-3"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {Object.keys(studentPerformance.subjects).map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>
              <div className="card bg-dark text-white p-3">
                <p><strong>{selectedSubject}:</strong> {studentPerformance.subjects[selectedSubject]} / 100</p>
                <p>Class Average: {studentPerformance.classAverage[selectedSubject]}</p>
                <p>Top Student: {studentPerformance.topStudent[selectedSubject]}</p>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="col-md-6">
              <h5>Additional Metrics</h5>
              <div className="card bg-dark text-white p-3">
                <p>Average Score: {Math.round(
                  Object.values(studentPerformance.subjects).reduce((a,b)=>a+b,0) / Object.values(studentPerformance.subjects).length
                )}</p>
                <p>Subjects Above Class Average: {Object.entries(studentPerformance.subjects).filter(
                  ([sub, score]) => score >= studentPerformance.classAverage[sub]
                ).length}</p>
                <p>Subjects Below Class Average: {Object.entries(studentPerformance.subjects).filter(
                  ([sub, score]) => score < studentPerformance.classAverage[sub]
                ).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
