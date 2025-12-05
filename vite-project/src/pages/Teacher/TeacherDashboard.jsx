import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard({ setUser }) {
  const navigate = useNavigate();

  const teacherAssignments = {
    "Form 2A": ["English", "Biology"],
    "Form 3B": ["Math", "English"],
  };

  const allStudents = {
    "Form 2A": [
      { name: "Bundi Nyaga", scores: {}, attendance: {} },
      { name: "Kinya Edith", scores: {}, attendance: {} },
    ],
    "Form 3B": [
      { name: "Mutuma Kenn", scores: {}, attendance: {} },
      { name: "Maingi Ian", scores: {}, attendance: {} },
    ],
  };

  // Announcements
  const announcements = [
    "Staff meeting on Friday at 2pm.",
    "Submit mid-term report updates by next week.",
    "Sports Day scheduled for next month.",
  ];

  const upcomingDates = [
    { event: "Mid-term Exams", date: "2025-03-15" },
    { event: "Closing Day", date: "2025-04-02" },
    { event: "Parents Meeting", date: "2025-04-10" },
  ];

  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [attendanceDate, setAttendanceDate] = useState("");

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

  const handleAttendanceChange = (studentIndex, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].attendance[attendanceDate] = value;
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
                activeMenu === "attendance"
                  ? "btn-secondary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveMenu("attendance")}
            >
              Attendance
            </button>
          </li>

          <li className="nav-item mb-2">
            <button
              className={`btn w-100 ${
                activeMenu === "reports"
                  ? "btn-secondary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveMenu("reports")}
            >
              Generate Reports
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

      {/* Main Area */}
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Welcome, Teacher</h2>

        {/* DASHBOARD */}
        {activeMenu === "dashboard" && (
          <>
            <h4>Your Assigned Classes & Subjects</h4>
            <ul className="list-group w-50 mt-3">
              {Object.keys(teacherAssignments).map((cls, i) => (
                <li key={i} className="list-group-item">
                  <strong>{cls}:</strong> {teacherAssignments[cls].join(", ")}
                </li>
              ))}
            </ul>

            {/* Announcements */}
            <h4 className="mt-5">Announcements</h4>
            <ul className="list-group w-75 mt-3">
              {announcements.map((note, i) => (
                <li key={i} className="list-group-item">
                  📌 {note}
                </li>
              ))}
            </ul>

            {/* ✅ Upcoming Key Dates */}
            <h4 className="mt-5">Upcoming Key Dates</h4>
            <table className="table table-striped w-75 mt-3">
              <thead className="table-light">
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {upcomingDates.map((d, i) => (
                  <tr key={i}>
                    <td>{d.event}</td>
                    <td>{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ENTER RESULTS */}
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
          </>
        )}

        {/* ATTENDANCE */}
        {activeMenu === "attendance" && (
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
                <label className="form-label">Select Date:</label>
                <input
                  type="date"
                  className="form-control w-50"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                />

                {attendanceDate && (
                  <>
                    <h4 className="mt-4">Attendance - {selectedClass}</h4>
                    <table className="table table-striped mt-3">
                      <thead className="table-light">
                        <tr>
                          <th>Student Name</th>
                          <th>Present / Absent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((s, idx) => (
                          <tr key={idx}>
                            <td>{s.name}</td>
                            <td>
                              <select
                                className="form-select"
                                value={s.attendance[attendanceDate] || ""}
                                onChange={(e) =>
                                  handleAttendanceChange(idx, e.target.value)
                                }
                              >
                                <option value="">-- Select --</option>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* REPORT CARDS */}
        {activeMenu === "reports" && (
          <>
            <h4>Generate Report Cards</h4>

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

            {selectedClass && (
              <button
                className="btn btn-primary mt-3"
                onClick={() => window.print()}
              >
                Print Report Cards
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
