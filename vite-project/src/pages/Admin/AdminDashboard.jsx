import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data: teachers and classes
const teachers = ["Teacher 1", "Teacher 2", "Teacher 3"];
const classes = ["Form 2A", "Form 3B"];
const subjects = ["English", "Math", "Science", "History"];

export default function AdminDashboard({ setUser }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [viewSection, setViewSection] = useState("viewResults"); // toggle between results and assign classes
  const navigate = useNavigate();

  // Mock class data for viewing results
  const classData = {
    "Form 2A": {
      subjects: ["English", "Science"],
      students: [
        { name: "John Doe", scores: { English: 85, Science: 90 } },
        { name: "Alice Brown", scores: { English: 78, Science: 88 } },
      ],
    },
    "Form 3B": {
      subjects: ["Math", "English"],
      students: [
        { name: "Jane Smith", scores: { Math: 92, English: 80 } },
        { name: "Bob Johnson", scores: { Math: 75, English: 85 } },
      ],
    },
  };

  const handleAssign = () => {
    if (!selectedClass || !selectedTeacher || !selectedSubject) return;
    setAssignments([
      ...assignments,
      { class: selectedClass, teacher: selectedTeacher, subject: selectedSubject },
    ]);
    setSelectedClass("");
    setSelectedTeacher("");
    setSelectedSubject("");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const currentClass = classData[selectedClass];

  return (
    <div className="vh-100 d-flex" style={{ backgroundColor: "darkgreen", color: "white" }}>
      {/* Sidebar */}
      <div className="p-3" style={{ width: "250px", backgroundColor: "#2e4d2e" }}>
        <h4 className="mb-4">Admin Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className="btn btn-outline-light w-100"
              onClick={() => setViewSection("viewResults")}
            >
              View Classes
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className="btn btn-outline-light w-100"
              onClick={() => setViewSection("assignClasses")}
            >
              Assign Classes
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100">Send Alerts</button>
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
        <h2 className="mb-4">Welcome, Admin</h2>

        {viewSection === "viewResults" && (
          <>
            <div className="mb-3">
              <label className="form-label">Select Class:</label>
              <select
                className="form-select w-50"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">-- Choose Class --</option>
                {Object.keys(classData).map((cls, index) => (
                  <option key={index} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {currentClass && (
              <>
                <h4 className="mt-4">Results for {selectedClass}</h4>
                <table className="table table-dark table-striped mt-3">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      {currentClass.subjects.map((subj, index) => (
                        <th key={index}>{subj}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentClass.students.map((student, idx) => (
                      <tr key={idx}>
                        <td>{student.name}</td>
                        {currentClass.subjects.map((subj, sidx) => (
                          <td key={sidx}>{student.scores[subj]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-3">
                  <button className="btn btn-light me-2" onClick={() => window.print()}>
                    Print Results
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() =>
                      alert(`Results for ${selectedClass} sent to parents (mock)`)
                    }
                  >
                    Send to Parents
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {viewSection === "assignClasses" && (
          <>
            <h4 className="mt-4">Assign Teacher to Class & Subject</h4>
            <div className="row g-3 mt-2 w-50">
              <div className="col-12">
                <label className="form-label">Select Class</label>
                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">-- Choose Class --</option>
                  {classes.map((cls, idx) => (
                    <option key={idx} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Select Teacher</label>
                <select
                  className="form-select"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">-- Choose Teacher --</option>
                  {teachers.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Select Subject</label>
                <select
                  className="form-select"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">-- Choose Subject --</option>
                  {subjects.map((subj, idx) => (
                    <option key={idx} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <button className="btn btn-light mt-3" onClick={handleAssign}>
                  Assign
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h5>Current Assignments</h5>
              <ul className="list-group w-50">
                {assignments.map((a, idx) => (
                  <li key={idx} className="list-group-item bg-dark text-white">
                    {a.teacher} → {a.class} ({a.subject})
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
