import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnrollStudent from "./EnrollStudent.jsx";
import EnrollTeacher from "./EnrollTeacher.jsx";


export default function AdminDashboard({ setUser }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [enrollType, setEnrollType] = useState("student");


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
    "Mr. John Opiyo",
    "Ms. Mary Wambui",
    "Mr. Brian Ochieng",
    "Mrs. Tracy Aisha",
    "Mr. Charles Chitechi",
  ];

  // Admin numbers for dashboard
  const totalStudents = 400;
  const totalTeachers = teachers.length;
  const totalClasses = 16; // 4 forms × 4 streams
  const recentActivity = [
    "Registered Form 2A Student",
    "Assigned Mathematics to Mr. John",
    "Generated Form 3B Report Sheet",
  ];
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

  // Assignment state
  const [selectedClass, setSelectedClass] = useState("");
  const [pendingAssignments, setPendingAssignments] = useState({});
  const [savedAssignments, setSavedAssignments] = useState([]);

  const [selectedClassForThreshold, setSelectedClassForThreshold] = useState(""); 


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

  // View Classes state
  const [viewClass, setViewClass] = useState("");
  const [viewStream, setViewStream] = useState("");
  const sampleClassList = ["Bundi Nyaga", "Kinya Edith", "Mutuma Kenn", "Maingi Ian"];

  // EXAM RESULTS STATE
  const [examClass, setExamClass] = useState("");
  const [examStudents, setExamStudents] = useState([]);
  const [examSubjects, setExamSubjects] = useState(subjects);

  // ANNOUNCEMENT STATE 
  const [announcementAudience, setAnnouncementAudience] = useState([]);
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [sentAnnouncements, setSentAnnouncements] = useState([]);

  // PERFORMANCE THRESHOLDS STATE
  const [performanceThresholds, setPerformanceThresholds] = useState({
    "Form 1": {
      English: 50,
      Math: 50,
      Science: 50,
    },
    "Form 2": {
      English: 55,
      Math: 55,
      Science: 55,
    },
  });



  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const handleTeacherSelect = (subject, teacher) => {
    setPendingAssignments((prev) => {
      if (!teacher) {
        const cp = { ...prev };
        delete cp[subject];
        return cp;
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

    alert(`${newOnes.length} saved. ${skipped.length ? skipped.join(", ") + " skipped" : ""}`);
  };

  const removeAssignment = (subject, className) => {
    setSavedAssignments((prev) =>
      prev.filter((a) => !(a.subject === subject && a.className === className))
    );
  };

  // SUBMIT STUDENT
  const submitStudent = () => {
    alert(`Student Registered: ${studentData.name}, ${studentData.className}${studentData.stream}`);
    setStudentData({ name: "", dob: "", className: "", stream: "", parentContact: "", parentEmail: "" });
  };

  // SUBMIT TEACHER
  const submitTeacher = () => {
    alert(`Teacher Registered: ${teacherData.name}, Subject: ${teacherData.subject}`);
    setTeacherData({ name: "", subject: "", phone: "", email: "" });
  };

  // Record exam scores
  const handleScoreChange = (idx, subj, value) => {
    const updated = [...examStudents];
    updated[idx].scores[subj] = value;
    setExamStudents(updated);
  };

  // Helper: toggle audience
const toggleAudience = (group) => {
  if (announcementAudience.includes(group)) {
    setAnnouncementAudience(announcementAudience.filter((g) => g !== group));
  } else {
    setAnnouncementAudience([...announcementAudience, group]);
  }
};

// Helper: send announcement
const sendAnnouncement = () => {
  if (!announcementMessage.trim()) return alert("Write a message first!");
  if (announcementAudience.length === 0) return alert("Select audience!");

  setSentAnnouncements([
    ...sentAnnouncements,
    {
      message: announcementMessage,
      audience: [...announcementAudience],
      date: new Date().toLocaleString(),
    },
  ]);

  setAnnouncementMessage("");
  setAnnouncementAudience([]);

  alert("Announcement Sent ✅");
};


  return (
    <div className="vh-100 d-flex" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <div className="p-3 border-end" style={{ width: "250px", backgroundColor: "white" }}>
        <h4 className="mb-4">Admin Menu</h4>

        {[
          { label: "Dashboard", key: "dashboard" },
          { label: "View Classes", key: "view" },
          { label: "Assign Classes", key: "assign" },
          { label: "Record Results", key: "results" },
          { label: "Generate Reports", key: "reports" },
          { label: "New Enrolment", key: "enrol" },
          { label: "Send Alerts", key: "alerts" },
          { label: "Announcements", key: "announcements" },
          { label: "Set Thresholds", key: "thresholds" },


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

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Admin Dashboard</h2>

        {/* DASHBOARD OVERVIEW */}
        {activeMenu === "dashboard" && (
          <>
            <div className="row">
              <div className="col-md-3">
                <div className="card p-3 text-center">
                  <h5>Total Students</h5>
                  <h2>{totalStudents}</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card p-3 text-center">
                  <h5>Total Teachers</h5>
                  <h2>{totalTeachers}</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card p-3 text-center">
                  <h5>Total Classes</h5>
                  <h2>{totalClasses}</h2>
                </div>
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
            <h4 className="mt-4">Recent Activity</h4>
            <ul className="list-group w-50">
              {recentActivity.map((act, i) => (
                <li className="list-group-item" key={i}>
                  {act}
                </li>
              ))}
            </ul>

          </>
        )}

        {/* VIEW CLASSES */}
        {activeMenu === "view" && (
          <>
            <h4>View Classes</h4>

            <select
              className="form-select w-50 mt-3"
              value={viewClass}
              onChange={(e) => setViewClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              className="form-select w-50 mt-3"
              value={viewStream}
              onChange={(e) => setViewStream(e.target.value)}
            >
              <option value="">Select Stream</option>
              {streams.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {viewClass && viewStream && (
              <>
                <h5 className="mt-4">
                  Students in {viewClass}{viewStream}
                </h5>

                <ul className="list-group w-50">
                  {sampleClassList.map((name, i) => (
                    <li className="list-group-item" key={i}>
                      {name}
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-primary mt-3"
                  onClick={() => window.print()}
                >
                  Print Class List
                </button>
              </>
            )}
          </>
        )}

        {/* ASSIGN CLASSES (existing code, unchanged) */}
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
                          <p className="mt-2 text-success">✅ {pendingAssignments[subj]}</p>
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

        {/* RECORD RESULTS */}
        {activeMenu === "results" && (
          <>
            <h4>Record Exam Results</h4>

            <select
              className="form-select w-50 mt-2"
              value={examClass}
              onChange={(e) => {
                setExamClass(e.target.value);
                setExamStudents([
                  { name: "Bundi Nyaga", scores: {} },
                  { name: "Kinya Edith", scores: {} },
                  { name: "Mutuma Kenns", scores: {} },
                  { name: "Maingi Ian", scores: {} },
                ]);
              }}
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {examClass && (
              <>
                <table className="table table-bordered mt-3 bg-white">
                  <thead>
                    <tr>
                      <th>Student</th>
                      {examSubjects.map((subj) => (
                        <th key={subj}>{subj}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {examStudents.map((st, i) => (
                      <tr key={i}>
                        <td>{st.name}</td>
                        {examSubjects.map((subj) => (
                          <td key={subj}>
                            <input
                              type="number"
                              className="form-control"
                              min="0"
                              max="100"
                              value={st.scores[subj] || ""}
                              onChange={(e) =>
                                handleScoreChange(i, subj, e.target.value)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button className="btn btn-success">Save Results</button>
              </>
            )}
          </>
        )}

        {/* GENERATE REPORTS */}
        {activeMenu === "reports" && (
          <>
            <h4>Generate Reports</h4>

            <p>Print student performance per class or whole stream:</p>

            <select className="form-select w-50 mt-2">
              <option value="">Select Class</option>
              {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
            </select>

            {/* NEW TERM SELECT DROPDOWN */}
            <select className="form-select w-50 mt-3">
              <option value="all">All Terms</option>
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
            </select>

            <button className="btn btn-primary mt-3" onClick={() => window.print()}>
            Print Class Report
            </button>

            <button className="btn btn-secondary mt-3 ms-2" onClick={() => window.print()}>
            Print Stream Report
            </button>
          </>
        )}


        {/* NEW ENROLMENT */}
        {activeMenu === "enrol" && (
          <>
            <h4>New Enrolment</h4>

            {/* Toggle between student and teacher registration */}
            <div className="mb-3">
              <button
                className={`btn ${enrollType === "student" ? "btn-secondary" : "btn-outline-secondary"} me-2`}
                onClick={() => setEnrollType("student")}
              >
                Register Student
              </button>
              <button
                className={`btn ${enrollType === "teacher" ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => setEnrollType("teacher")}
              >
                Register Teacher
              </button>
            </div>

            {enrollType === "student" ? <EnrollStudent /> : <EnrollTeacher />}
          </>
        )}

        {/* SEND ALERTS */}
            {activeMenu === "alerts" && (
            <>
              <h4>Send Alerts</h4>
              <p>Notifications to parents will be sent via SMS or email.</p>

              <button
              className="btn btn-warning mt-2"
              onClick={() => alert("✅ Results notification will be sent to parents. (Placeholder)")}
              >
              Send Results Notification to Parents
              </button>
            </>
        )}
        {/* ANNOUNCEMENTS SECTION */}
        {activeMenu === "announcements" && (
          <>
            <h4>Announcements</h4>
            <p>Send announcements to teachers or parents.</p>

            <label className="me-3">
              <input
                type="checkbox"
                checked={announcementAudience.includes("teachers")}
                onChange={() => toggleAudience("teachers")}
              />{" "}
              Teachers
            </label>

            <label className="me-3">
              <input
                type="checkbox"
                checked={announcementAudience.includes("parents")}
                onChange={() => toggleAudience("parents")}
              />{" "}
              Parents
            </label>

            <textarea
              className="form-control w-75 mt-3"
              rows={3}
              placeholder="Write announcement..."
              value={announcementMessage}
              onChange={(e) => setAnnouncementMessage(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={sendAnnouncement}>
              Send Announcement
            </button>

            {sentAnnouncements.length > 0 && (
              <div className="mt-4 w-75">
                <h5>Sent Announcements</h5>
                <ul className="list-group">
                  {sentAnnouncements.map((ann, i) => (
                    <li className="list-group-item" key={i}>
                      <strong>{ann.date}</strong>: {ann.message}
                      <br />
                      <small>To: {ann.audience.join(" & ")}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        {/* THRESHOLDS SECTION */}
        {activeMenu === "thresholds" && (
          <>
            <h4>Set Performance Thresholds</h4>

            <select
              className="form-select w-50 mb-3"
              value={selectedClassForThreshold}
              onChange={(e) => setSelectedClassForThreshold(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>

            {selectedClassForThreshold && (
              <div className="card p-3 w-75">
                {subjects.map((subj) => (
                  <div className="mb-2" key={subj}>
                    <label className="form-label">{subj} Threshold</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max="100"
                      value={performanceThresholds[selectedClassForThreshold]?.[subj] || ""}
                      onChange={(e) => {
                        const newThresholds = { ...performanceThresholds };
                        if (!newThresholds[selectedClassForThreshold]) newThresholds[selectedClassForThreshold] = {};
                        newThresholds[selectedClassForThreshold][subj] = Number(e.target.value);
                        setPerformanceThresholds(newThresholds);
                      }}
                    />
                  </div>
                ))}

                <button className="btn btn-success mt-3" onClick={() => alert("Thresholds saved!")}>
                  Save Thresholds
                </button>
              </div>
            )}
          </>
        )}



      </div>
    </div>
  );
}
