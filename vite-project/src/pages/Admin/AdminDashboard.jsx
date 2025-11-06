import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ setUser }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("assign");

  const classes = ["Form 1", "Form 2", "Form 3", "Form 4"];
  const streams = ["A", "B", "C", "D"];

  const subjects = [
    "English",
    "Kiswahili",
    "Mathematics",
    "Chemistry",
    "Physics",
    "Biology",
    "Geography",
    "French",
  ];

  const teachers = [
    "Mr. John",
    "Ms. Mary",
    "Mr. Brian",
    "Mrs. Tracy",
    "Mr. Charles",
  ];

  // Assignment state
  const [selectedClass, setSelectedClass] = useState("");
  const [pendingAssignments, setPendingAssignments] = useState({});
  const [savedAssignments, setSavedAssignments] = useState([]);

  // New Enrolment tabs
  const [activeEnrolTab, setActiveEnrolTab] = useState("student");

  // Student form state
  const [studentData, setStudentData] = useState({
    name: "",
    dob: "",
    className: "",
    stream: "",
    parentContact: "",
    parentEmail: "",
  });

  // Teacher form state
  const [teacherData, setTeacherData] = useState({
    name: "",
    subject: "",
    phone: "",
    email: "",
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  // Change selected teacher
  const handleTeacherSelect = (subject, teacher) => {
    setPendingAssignments((prev) => {
      if (!teacher) {
        const copy = { ...prev };
        delete copy[subject];
        return copy;
      }
      return { ...prev, [subject]: teacher };
    });
  };

  const saveAssignments = () => {
    if (!selectedClass) return alert("Select a class first.");

    const entries = Object.entries(pendingAssignments);
    if (entries.length === 0) return alert("No subjects assigned yet.");

    const newOnes = [];
    const skipped = [];

    entries.forEach(([subject, teacher]) => {
      const exists = savedAssignments.some(
        (a) => a.className === selectedClass && a.subject === subject
      );

      if (exists) skipped.push(subject);
      else newOnes.push({ className: selectedClass, subject, teacher });
    });

    setSavedAssignments((prev) => [...prev, ...newOnes]);

    const remaining = { ...pendingAssignments };
    newOnes.forEach((a) => delete remaining[a.subject]);
    setPendingAssignments(remaining);

    alert(`${newOnes.length} saved. ${skipped.length ? `${skipped.join(", ")} skipped.` : ""}`);
  };

  const removeAssignment = (subject, className) => {
    setSavedAssignments((prev) =>
      prev.filter((a) => !(a.subject === subject && a.className === className))
    );
  };

  // SUBMIT STUDENT
  const submitStudent = () => {
    alert(
      `Student Registered:\n${studentData.name}, ${studentData.className}${studentData.stream}, Parent: ${studentData.parentContact}`
    );
    setStudentData({
      name: "",
      dob: "",
      className: "",
      stream: "",
      parentContact: "",
      parentEmail: "",
    });
  };

  // SUBMIT TEACHER
  const submitTeacher = () => {
    alert(
      `Teacher Registered:\n${teacherData.name}, Subject: ${teacherData.subject}, Phone: ${teacherData.phone}`
    );
    setTeacherData({ name: "", subject: "", phone: "", email: "" });
  };

  return (
    <div className="vh-100 d-flex" style={{ backgroundColor: "#f5f5f5" }}>
      {/* ✅ Sidebar */}
      <div
        className="p-3 border-end"
        style={{ width: "250px", backgroundColor: "white" }}
      >
        <h4 className="mb-4">Admin Menu</h4>

        {[
          { label: "Dashboard", key: "dashboard" },
          { label: "View Classes", key: "view" },
          { label: "Assign Classes", key: "assign" },
          { label: "New Enrolment", key: "enrol" },
          { label: "Send Alerts", key: "alerts" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveMenu(item.key)}
            className="btn w-100 mb-2"
            style={{
              border: "1px solid #ddd",
              backgroundColor: activeMenu === item.key ? "#e9ecef" : "white",
              textAlign: "left",
              color: "black",
            }}
            onMouseEnter={(e) => {
              if (activeMenu !== item.key) e.target.style.backgroundColor = "#f2f2f2";
            }}
            onMouseLeave={(e) => {
              if (activeMenu !== item.key) e.target.style.backgroundColor = "white";
            }}
          >
            {item.label}
          </button>
        ))}

        <button className="btn btn-danger w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ✅ Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Admin Dashboard</h2>

        {/* ✅ New Enrolment Page */}
        {activeMenu === "enrol" && (
          <>
            <h4>New Enrolment</h4>

            {/* Tabs */}
            <div className="d-flex mb-3">
              <button
                className="btn me-2"
                style={{
                  backgroundColor: activeEnrolTab === "student" ? "#e9ecef" : "white",
                  border: "1px solid #ccc",
                }}
                onClick={() => setActiveEnrolTab("student")}
              >
                Register Student
              </button>

              <button
                className="btn"
                style={{
                  backgroundColor: activeEnrolTab === "teacher" ? "#e9ecef" : "white",
                  border: "1px solid #ccc",
                }}
                onClick={() => setActiveEnrolTab("teacher")}
              >
                Register Teacher
              </button>
            </div>

            {/* ✅ STUDENT FORM */}
            {activeEnrolTab === "student" && (
              <div className="card p-4" style={{ background: "white" }}>
                <h5>Register Student</h5>

                <input
                  className="form-control mt-2"
                  placeholder="Full Name"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                />

                <input
                  className="form-control mt-2"
                  type="date"
                  placeholder="DOB"
                  value={studentData.dob}
                  onChange={(e) => setStudentData({ ...studentData, dob: e.target.value })}
                />

                <select
                  className="form-select mt-2"
                  value={studentData.className}
                  onChange={(e) => setStudentData({ ...studentData, className: e.target.value })}
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <select
                  className="form-select mt-2"
                  value={studentData.stream}
                  onChange={(e) => setStudentData({ ...studentData, stream: e.target.value })}
                >
                  <option value="">Select Stream</option>
                  {streams.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <input
                  className="form-control mt-2"
                  placeholder="Parent Contact"
                  value={studentData.parentContact}
                  onChange={(e) =>
                    setStudentData({ ...studentData, parentContact: e.target.value })
                  }
                />

                <input
                  className="form-control mt-2"
                  placeholder="Parent Email (optional)"
                  value={studentData.parentEmail}
                  onChange={(e) =>
                    setStudentData({ ...studentData, parentEmail: e.target.value })
                  }
                />

                <button className="btn btn-success mt-3" onClick={submitStudent}>
                  Register Student
                </button>
              </div>
            )}

            {/* ✅ TEACHER FORM */}
            {activeEnrolTab === "teacher" && (
              <div className="card p-4" style={{ background: "white" }}>
                <h5>Register Teacher</h5>

                <input
                  className="form-control mt-2"
                  placeholder="Full Name"
                  value={teacherData.name}
                  onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
                />

                <select
                  className="form-select mt-2"
                  value={teacherData.subject}
                  onChange={(e) => setTeacherData({ ...teacherData, subject: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <input
                  className="form-control mt-2"
                  placeholder="Phone Number"
                  value={teacherData.phone}
                  onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })}
                />

                <input
                  className="form-control mt-2"
                  placeholder="Email"
                  value={teacherData.email}
                  onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
                />

                <button className="btn btn-success mt-3" onClick={submitTeacher}>
                  Register Teacher
                </button>
              </div>
            )}
          </>
        )}

        {/* ✅ Existing Assign Classes Section */}
        {activeMenu === "assign" && (
          <>
            <h4>Select Class</h4>
            <select
              className="form-select w-50 mb-3"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">-- Choose Class --</option>
              {classes.map((cls) => (
                <option key={cls}>{cls}</option>
              ))}
            </select>

            {selectedClass && (
              <>
                <h4 className="mt-4">Assign Teachers for {selectedClass}</h4>
                <div className="row mt-3">
                  {subjects.map((subj) => (
                    <div className="col-md-4 mb-3" key={subj}>
                      <div className="p-3 border rounded" style={{ background: "white" }}>
                        <h5>{subj}</h5>
                        <select
                          className="form-select mt-2"
                          value={pendingAssignments[subj] || ""}
                          onChange={(e) => handleTeacherSelect(subj, e.target.value)}
                        >
                          <option value="">-- Select Teacher --</option>
                          {teachers.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>

                        {pendingAssignments[subj] && (
                          <p className="mt-2 text-success">
                            ✅ {pendingAssignments[subj]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-success mt-3" onClick={saveAssignments}>
                  Assign Selected Teachers
                </button>

                <h4 className="mt-4">Current Assignments</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Teacher</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedAssignments.map((a, i) => (
                      <tr key={i}>
                        <td>{a.className}</td>
                        <td>{a.subject}</td>
                        <td>{a.teacher}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeAssignment(a.subject, a.className)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
