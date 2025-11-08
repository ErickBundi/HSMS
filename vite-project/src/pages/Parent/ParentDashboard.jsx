import { useState } from "react";
import { useNavigate } from "react-router-dom";

const studentPerformance = {
  name: "Bundi Nyaga",
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

// Announcements and Upcoming Dates
const announcements = [
  "Fees due by end of this month to avoid penalties.",
];
const upcomingDates = [
  { event: "Mid-term Exams", date: "2025-03-15" },
  { event: "Parents Meeting", date: "2025-04-02" },
  { event: "Closing Day", date: "2025-04-10" },
];

// Attendance – temp sample data
const attendanceRecords = [
  { date: "2025-02-01", status: "Present" },
  { date: "2025-02-02", status: "Absent" },
  { date: "2025-02-03", status: "Present" },
  { date: "2025-02-04", status: "Present" },
];

// Documents – download placeholders
const documents = [
  { name: "Term 1 Report Card", file: "/docs/term1-report.pdf" },
  { name: "School Fees Circular 2025", file: "/docs/fees-2025.pdf" },
  { name: "Memo: Remote Learning Update", file: "/docs/timetable.pdf" },
];

export default function ParentDashboard({ setUser }) {
  const [selectedSubject, setSelectedSubject] = useState("English");
  const [activeMenu, setActiveMenu] = useState("dashboard"); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="vh-100 d-flex flex-column"
      style={{ backgroundColor: "#f8f9fa", color: "black" }}
    >
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className="p-3"
          style={{
            width: "250px",
            backgroundColor: "white",
            borderRight: "1px solid #ddd",
          }}
        >
          <h4 className="mb-4">Parent Menu</h4>
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
                  activeMenu === "attendance"
                    ? "btn-secondary text-white"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setActiveMenu("attendance")}
              >
                Track Attendance
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className={`btn w-100 ${
                  activeMenu === "documents"
                    ? "btn-secondary text-white"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setActiveMenu("documents")}
              >
                Documents
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className={`btn w-100 ${
                  activeMenu === "contact"
                    ? "btn-secondary text-white"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setActiveMenu("contact")}
              >
                Contact Teacher
              </button>
            </li>

            <li className="nav-item mb-2">
              <button className="btn btn-danger w-100" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h2 className="mb-4">Welcome, Parent</h2>


          {/* MAIN DASHBOARD */}
          {activeMenu === "dashboard" && (
            <>
              <h4>{studentPerformance.name}'s Performance</h4>

              {/* Subject Summary Row */}
              <div className="d-flex justify-content-between bg-light border p-3 mb-4 rounded">
                {Object.entries(studentPerformance.subjects).map(
                  ([subject, score], idx) => (
                    <div
                      key={idx}
                      className="text-center flex-grow-1"
                      style={{
                        borderRight:
                          idx !==
                          Object.entries(studentPerformance.subjects).length - 1
                            ? "1px solid #ccc"
                            : "none",
                        padding: "0 10px",
                      }}
                    >
                      <strong>{subject}</strong>
                      <div>{score} / 100</div>
                    </div>
                  )
                )}
              </div>

              <div className="row g-3 mb-4">
                {/* Detailed subject stats */}
                <div className="col-md-6">
                  <h5>Performance by Subject</h5>
                  <select
                    className="form-select mb-3"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {Object.keys(studentPerformance.subjects).map(
                      (sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      )
                    )}
                  </select>

                  <div className="card p-3">
                    <p>
                      <strong>{selectedSubject}:</strong>{" "}
                      {studentPerformance.subjects[selectedSubject]} / 100
                    </p>
                    <p>
                      Class Average:{" "}
                      {studentPerformance.classAverage[selectedSubject]}
                    </p>
                    <p>
                      Top Student:{" "}
                      {studentPerformance.topStudent[selectedSubject]}
                    </p>
                  </div>
                </div>

                {/* More metrics */}
                <div className="col-md-6">
                  <h5>Additional Metrics</h5>
                  <div className="card p-3">
                    <p>
                      Average Score:{" "}
                      {Math.round(
                        Object.values(studentPerformance.subjects).reduce(
                          (a, b) => a + b,
                          0
                        ) /
                          Object.values(studentPerformance.subjects).length
                      )}
                    </p>

                    <p>
                      Subjects Above Class Average:{" "}
                      {
                        Object.entries(studentPerformance.subjects).filter(
                          ([sub, score]) =>
                            score >= studentPerformance.classAverage[sub]
                        ).length
                      }
                    </p>

                    <p>
                      Subjects Below Class Average:{" "}
                      {
                        Object.entries(studentPerformance.subjects).filter(
                          ([sub, score]) =>
                            score < studentPerformance.classAverage[sub]
                        ).length
                      }
                    </p>
                  </div>
                </div>

                {/* Announcements */}
                <h4 className="mt-5">Announcements</h4>
                <ul className="list-group w-75 mt-3">
                  {announcements.map((note, i) => (
                    <li key={i} className="list-group-item">
                      📌 {note}
                    </li>
                  ))}
                </ul>

                {/* Upcoming Events */}
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
              </div>
            </>
          )}


          {/* TRACK ATTENDANCE */}
          {activeMenu === "attendance" && (
            <>
              <h4>Attendance Record</h4>
              <table className="table table-striped w-75 mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((rec, i) => (
                    <tr key={i}>
                      <td>{rec.date}</td>
                      <td>{rec.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

        
          {/* DOCUMENTS DOWNLOAD */}         
          {activeMenu === "documents" && (
            <>
              <h4>Documents</h4>
              <ul className="list-group w-75 mt-3">
                {documents.map((doc, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    {doc.name}
                    <a className="btn btn-outline-primary btn-sm" href={doc.file} download>
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* CONTACT TEACHER */}
          {/* CONTACT TEACHER */}
          {activeMenu === "contact" && (
            <>
              <h4>Class Teacher Contact</h4>

              <div className="card w-50 mt-3 p-3">
                <h5>Mr. Laurence Marete</h5>
                <p>
                  <strong>Subject:</strong> Mathematics
                </p>
                <p>
                  <strong>Phone:</strong> +254 712 345 678
                </p>
                <p>
                  <strong>Email:</strong> laurence.marete@school.ac.ke
                </p>
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => alert("Calling " + "Mr. Laurence Marete")}
                >
                  Call
                </button>
                <button
                  className="btn btn-outline-secondary mt-2 ms-2"
                  onClick={() => alert("Sending email to " + "laurence.marete@school.ac.ke")}
                >
                  Email
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
